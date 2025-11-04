import json
import os
from typing import Dict, Any
import psycopg2
from datetime import datetime

def handler(event: Dict[str, Any], context: Any) -> Dict[str, Any]:
    '''
    Business: Обработка платежей через СПБ для покупки донатов с записью в БД
    Args: event - dict с httpMethod, body (product_id, product_name, player_name, price)
          context - объект с request_id
    Returns: HTTP response с payment_url или ошибкой
    '''
    method: str = event.get('httpMethod', 'GET')
    
    if method == 'OPTIONS':
        return {
            'statusCode': 200,
            'headers': {
                'Access-Control-Allow-Origin': '*',
                'Access-Control-Allow-Methods': 'POST, OPTIONS',
                'Access-Control-Allow-Headers': 'Content-Type',
                'Access-Control-Max-Age': '86400'
            },
            'body': '',
            'isBase64Encoded': False
        }
    
    if method != 'POST':
        return {
            'statusCode': 405,
            'headers': {'Content-Type': 'application/json', 'Access-Control-Allow-Origin': '*'},
            'body': json.dumps({'error': 'Method not allowed'}),
            'isBase64Encoded': False
        }
    
    body_data = json.loads(event.get('body', '{}'))
    product_id: str = body_data.get('product_id', '')
    product_name: str = body_data.get('product_name', product_id)
    player_name: str = body_data.get('player_name', '')
    price: int = body_data.get('price', 0)
    
    if not product_id or not player_name or price <= 0:
        return {
            'statusCode': 400,
            'headers': {'Content-Type': 'application/json', 'Access-Control-Allow-Origin': '*'},
            'body': json.dumps({'error': 'Не указаны product_id, player_name или price'}),
            'isBase64Encoded': False
        }
    
    order_id = f'kolix_{context.request_id}'
    api_key = os.environ.get('SPB_API_KEY', '')
    database_url = os.environ.get('DATABASE_URL', '')
    
    payment_url = 'https://demo-payment.example.com' if not api_key else f'https://payment.example.com/pay/{order_id}'
    status_text = 'demo' if not api_key else 'success'
    
    if database_url:
        try:
            conn = psycopg2.connect(database_url)
            cur = conn.cursor()
            
            cur.execute(
                '''INSERT INTO purchases 
                   (order_id, player_name, product_id, product_name, price, status, payment_url, created_at)
                   VALUES (%s, %s, %s, %s, %s, %s, %s, %s)''',
                (order_id, player_name, product_id, product_name, price, 'pending', payment_url, datetime.now())
            )
            
            conn.commit()
            cur.close()
            conn.close()
        except Exception as e:
            return {
                'statusCode': 500,
                'headers': {'Content-Type': 'application/json', 'Access-Control-Allow-Origin': '*'},
                'body': json.dumps({'error': f'Database error: {str(e)}'}),
                'isBase64Encoded': False
            }
    
    response_data = {
        'status': status_text,
        'order_id': order_id,
        'payment_url': payment_url,
        'product_id': product_id,
        'product_name': product_name,
        'player_name': player_name,
        'price': price
    }
    
    if not api_key:
        response_data['message'] = 'Демо-режим: API ключ не настроен'
    
    return {
        'statusCode': 200,
        'headers': {'Content-Type': 'application/json', 'Access-Control-Allow-Origin': '*'},
        'body': json.dumps(response_data),
        'isBase64Encoded': False
    }
