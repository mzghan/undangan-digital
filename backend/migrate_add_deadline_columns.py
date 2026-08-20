"""
Migrasi manual: tambah kolom deadline_recommended & deadline_is_custom
ke tabel checklist_items_premium.

Jalankan sekali dari folder backend/:
    python migrate_add_deadline_columns.py

Aman dijalankan berkali-kali — script cek dulu kolom sudah ada atau belum.
"""
import sqlite3

DB_PATH = "undangan.db"


def column_exists(cursor: sqlite3.Cursor, table: str, column: str) -> bool:
    cursor.execute(f"PRAGMA table_info({table})")
    return any(row[1] == column for row in cursor.fetchall())


def main():
    conn = sqlite3.connect(DB_PATH)
    cursor = conn.cursor()

    if not column_exists(cursor, "checklist_items_premium", "deadline_recommended"):
        cursor.execute(
            "ALTER TABLE checklist_items_premium ADD COLUMN deadline_recommended DATETIME"
        )
        print("Kolom deadline_recommended ditambahkan.")
    else:
        print("Kolom deadline_recommended sudah ada, dilewati.")

    if not column_exists(cursor, "checklist_items_premium", "deadline_is_custom"):
        cursor.execute(
            "ALTER TABLE checklist_items_premium ADD COLUMN deadline_is_custom BOOLEAN NOT NULL DEFAULT 0"
        )
        print("Kolom deadline_is_custom ditambahkan.")
    else:
        print("Kolom deadline_is_custom sudah ada, dilewati.")

    conn.commit()
    conn.close()
    print("Migrasi selesai.")


if __name__ == "__main__":
    main()