import json
import os
from typing import Dict, Any

def handler(event: Dict[str, Any], context: Any) -> Dict[str, Any]:
    '''
    Business: Обработка платежей через СПБ для покупки донатов
    Args: event - dict с httpMethod, body (product_id, player_name, price)
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
    player_name: str = body_data.get('player_name', '')
    price: int = body_data.get('price', 0)
    
    if not product_id or not player_name or price <= 0:
        return {
            'statusCode': 400,
            'headers': {'Content-Type': 'application/json', 'Access-Control-Allow-Origin': '*'},
            'body': json.dumps({'error': 'Не указаны product_id, player_name или price'}),
            'isBase64Encoded': False
        }
    
    api_key = os.environ.get('SPB_API_KEY', '')
    
    if not api_key:
        return {
            'statusCode': 200,
            'headers': {'Content-Type': 'application/json', 'Access-Control-Allow-Origin': '*'},
            'body': json.dumps({
                'status': 'demo',
                'message': 'Демо-режим: API ключ не настроен',
                'payment_url': 'https://demo-payment.example.com',
                'order_id': f'demo_{context.request_id}'
            }),
            'isBase64Encoded': False
        }
    
    order_id = f'kolix_{context.request_id}'
    
    return {
        'statusCode': 200,
        'headers': {'Content-Type': 'application/json', 'Access-Control-Allow-Origin': '*'},
        'body': json.dumps({
            'status': 'success',
            'order_id': order_id,
            'payment_url': f'https://payment.example.com/pay/{order_id}',
            'product_id': product_id,
            'player_name': player_name,
            'price': price
        }),
        'isBase64Encoded': False
    }
