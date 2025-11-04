import json
import os
from typing import Dict, Any
import psycopg2

def handler(event: Dict[str, Any], context: Any) -> Dict[str, Any]:
    '''
    Business: Получение информации о заказе по order_id или player_name
    Args: event - dict с httpMethod, queryStringParameters (order_id или player_name)
          context - объект с request_id
    Returns: HTTP response с данными заказа
    '''
    method: str = event.get('httpMethod', 'GET')
    
    if method == 'OPTIONS':
        return {
            'statusCode': 200,
            'headers': {
                'Access-Control-Allow-Origin': '*',
                'Access-Control-Allow-Methods': 'GET, OPTIONS',
                'Access-Control-Allow-Headers': 'Content-Type',
                'Access-Control-Max-Age': '86400'
            },
            'body': '',
            'isBase64Encoded': False
        }
    
    if method != 'GET':
        return {
            'statusCode': 405,
            'headers': {'Content-Type': 'application/json', 'Access-Control-Allow-Origin': '*'},
            'body': json.dumps({'error': 'Method not allowed'}),
            'isBase64Encoded': False
        }
    
    params = event.get('queryStringParameters', {}) or {}
    order_id = params.get('order_id', '')
    player_name = params.get('player_name', '')
    
    if not order_id and not player_name:
        return {
            'statusCode': 400,
            'headers': {'Content-Type': 'application/json', 'Access-Control-Allow-Origin': '*'},
            'body': json.dumps({'error': 'Укажите order_id или player_name'}),
            'isBase64Encoded': False
        }
    
    database_url = os.environ.get('DATABASE_URL', '')
    
    if not database_url:
        return {
            'statusCode': 500,
            'headers': {'Content-Type': 'application/json', 'Access-Control-Allow-Origin': '*'},
            'body': json.dumps({'error': 'Database not configured'}),
            'isBase64Encoded': False
        }
    
    try:
        conn = psycopg2.connect(database_url)
        cur = conn.cursor()
        
        if order_id:
            cur.execute(
                '''SELECT order_id, player_name, product_id, product_name, price, status, 
                          payment_url, created_at, paid_at, issued_at
                   FROM purchases WHERE order_id = %s''',
                (order_id,)
            )
            row = cur.fetchone()
            
            if not row:
                cur.close()
                conn.close()
                return {
                    'statusCode': 404,
                    'headers': {'Content-Type': 'application/json', 'Access-Control-Allow-Origin': '*'},
                    'body': json.dumps({'error': 'Order not found'}),
                    'isBase64Encoded': False
                }
            
            result = {
                'order_id': row[0],
                'player_name': row[1],
                'product_id': row[2],
                'product_name': row[3],
                'price': row[4],
                'status': row[5],
                'payment_url': row[6],
                'created_at': row[7].isoformat() if row[7] else None,
                'paid_at': row[8].isoformat() if row[8] else None,
                'issued_at': row[9].isoformat() if row[9] else None
            }
        else:
            cur.execute(
                '''SELECT order_id, player_name, product_id, product_name, price, status, 
                          payment_url, created_at, paid_at, issued_at
                   FROM purchases WHERE player_name = %s ORDER BY created_at DESC LIMIT 10''',
                (player_name,)
            )
            rows = cur.fetchall()
            
            result = {
                'player_name': player_name,
                'orders': [
                    {
                        'order_id': row[0],
                        'player_name': row[1],
                        'product_id': row[2],
                        'product_name': row[3],
                        'price': row[4],
                        'status': row[5],
                        'payment_url': row[6],
                        'created_at': row[7].isoformat() if row[7] else None,
                        'paid_at': row[8].isoformat() if row[8] else None,
                        'issued_at': row[9].isoformat() if row[9] else None
                    }
                    for row in rows
                ]
            }
        
        cur.close()
        conn.close()
        
        return {
            'statusCode': 200,
            'headers': {'Content-Type': 'application/json', 'Access-Control-Allow-Origin': '*'},
            'body': json.dumps(result),
            'isBase64Encoded': False
        }
        
    except Exception as e:
        return {
            'statusCode': 500,
            'headers': {'Content-Type': 'application/json', 'Access-Control-Allow-Origin': '*'},
            'body': json.dumps({'error': f'Database error: {str(e)}'}),
            'isBase64Encoded': False
        }
