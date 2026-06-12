
- **Sessions (FR10):**
  - Key: `session:{citizenId}` -> مثال: `session:C101`
  - Value: `"active"` (String)
  - TTL: 3600 ثانية (ساعة واحدة).

- **Analytics Cache (FR9):**
  - Key: `area_stats:{areaId}` -> مثال: `area_stats:A01`
  - Value: JSON يحتوي على اسم المنطقة وعدد البلاغات.
  - TTL: 300 ثانية (لضمان تحديث البيانات الدورية).