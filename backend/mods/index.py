import json
import os
from typing import Dict, Any, List
import psycopg2
from psycopg2.extras import RealDictCursor

def handler(event: Dict[str, Any], context: Any) -> Dict[str, Any]:
    '''
    Business: API для работы с модами Minecraft (получение списка, скачивание)
    Args: event - dict с httpMethod, queryStringParameters
          context - объект с request_id
    Returns: HTTP response с JSON данными модов
    '''
    method: str = event.get('httpMethod', 'GET')
    
    if method == 'OPTIONS':
        return {
            'statusCode': 200,
            'headers': {
                'Access-Control-Allow-Origin': '*',
                'Access-Control-Allow-Methods': 'GET, POST, OPTIONS',
                'Access-Control-Allow-Headers': 'Content-Type, X-User-Id',
                'Access-Control-Max-Age': '86400'
            },
            'body': ''
        }
    
    db_url = os.environ.get('DATABASE_URL')
    if not db_url:
        return {
            'statusCode': 500,
            'headers': {
                'Content-Type': 'application/json',
                'Access-Control-Allow-Origin': '*'
            },
            'isBase64Encoded': False,
            'body': json.dumps({'error': 'Database connection not configured'})
        }
    
    conn = psycopg2.connect(db_url)
    cursor = conn.cursor(cursor_factory=RealDictCursor)
    
    if method == 'GET':
        params = event.get('queryStringParameters') or {}
        category = params.get('category')
        
        if category:
            cursor.execute(
                "SELECT id, name, description, version, category, image_url, downloads, file_size, minecraft_version, created_at FROM mods WHERE category = %s ORDER BY downloads DESC",
                (category,)
            )
        else:
            cursor.execute(
                "SELECT id, name, description, version, category, image_url, downloads, file_size, minecraft_version, created_at FROM mods ORDER BY downloads DESC"
            )
        
        mods = cursor.fetchall()
        
        for mod in mods:
            if mod.get('created_at'):
                mod['created_at'] = mod['created_at'].isoformat()
        
        cursor.close()
        conn.close()
        
        return {
            'statusCode': 200,
            'headers': {
                'Content-Type': 'application/json',
                'Access-Control-Allow-Origin': '*'
            },
            'isBase64Encoded': False,
            'body': json.dumps({'mods': mods})
        }
    
    if method == 'POST':
        body_data = json.loads(event.get('body', '{}'))
        mod_id = body_data.get('mod_id')
        
        if not mod_id:
            cursor.close()
            conn.close()
            return {
                'statusCode': 400,
                'headers': {
                    'Content-Type': 'application/json',
                    'Access-Control-Allow-Origin': '*'
                },
                'isBase64Encoded': False,
                'body': json.dumps({'error': 'mod_id required'})
            }
        
        cursor.execute(
            "UPDATE mods SET downloads = downloads + 1 WHERE id = %s RETURNING downloads",
            (mod_id,)
        )
        result = cursor.fetchone()
        conn.commit()
        cursor.close()
        conn.close()
        
        return {
            'statusCode': 200,
            'headers': {
                'Content-Type': 'application/json',
                'Access-Control-Allow-Origin': '*'
            },
            'isBase64Encoded': False,
            'body': json.dumps({
                'success': True,
                'downloads': result['downloads'] if result else 0
            })
        }
    
    return {
        'statusCode': 405,
        'headers': {
            'Content-Type': 'application/json',
            'Access-Control-Allow-Origin': '*'
        },
        'isBase64Encoded': False,
        'body': json.dumps({'error': 'Method not allowed'})
    }
