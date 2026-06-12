import redis

# decode_responses=True لكي نتعامل مع النصوص (Strings) مباشرة
r = redis.Redis(host='localhost', port=6379, decode_responses=True)

def set_user_session(citizen_id):
    """
    FR10: إدارة جلسات المواطنين النشطة
    تقوم هذه الدالة بتخزين جلسة المواطن عند تسجيل الدخول
    """
    key = f"session:{citizen_id}"
    r.set(key, "active")
    # تعيين وقت انتهاء الجلسة 
    r.expire(key, 3600)
    print(f"[DEBUG] Session created for: {citizen_id}")

def get_session(citizen_id):
    """
    التحقق مما إذا كانت جلسة المواطن لا تزال فعالة
    """
    status = r.get(f"session:{citizen_id}")
    return status

def cache_busiest_area(area_id, area_name, total_reports):
    """
    FR9 & NFR2: تحسين الأداء وتخزين المناطق الأكثر نشاطاً
    بدلاً من طلب البيانات من Neo4j في كل مرة، نخزنها هنا لمدة 5 دقائق
    """
    key = f"area_stats:{area_id}"
    data = f"Area: {area_name}, Reports Count: {total_reports}"
    # تخزين مع وقت انتهاء 
    r.set(key, data, ex=300)
    print(f"[DEBUG] Analytics cached for area: {area_name}")

def get_cached_analytics(area_id):
    return r.get(f"area_stats:{area_id}")