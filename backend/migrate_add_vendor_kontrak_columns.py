
import sqlite3

DB_PATH = "undangan.db"


def table_exists(cursor: sqlite3.Cursor, table: str) -> bool:
    cursor.execute(
        "SELECT name FROM sqlite_master WHERE type='table' AND name=?", (table,)
    )
    return cursor.fetchone() is not None


def column_exists(cursor: sqlite3.Cursor, table: str, column: str) -> bool:
    cursor.execute(f"PRAGMA table_info({table})")
    return any(row[1] == column for row in cursor.fetchall())


def main():
    conn = sqlite3.connect(DB_PATH)
    cursor = conn.cursor()

    if not table_exists(cursor, "vendors"):
        print("Tabel vendors belum ada — tidak perlu migrasi, create_all() akan membuatnya dengan kolom baru langsung.")
        conn.close()
        return

    if not column_exists(cursor, "vendors", "tanggal_kontrak"):
        cursor.execute("ALTER TABLE vendors ADD COLUMN tanggal_kontrak DATETIME")
        print("Kolom tanggal_kontrak ditambahkan.")
    else:
        print("Kolom tanggal_kontrak sudah ada, dilewati.")

    if not column_exists(cursor, "vendors", "dokumen_kontrak_url"):
        cursor.execute("ALTER TABLE vendors ADD COLUMN dokumen_kontrak_url VARCHAR")
        print("Kolom dokumen_kontrak_url ditambahkan.")
    else:
        print("Kolom dokumen_kontrak_url sudah ada, dilewati.")

    conn.commit()
    conn.close()
    print("Migrasi selesai.")


if __name__ == "__main__":
    main()