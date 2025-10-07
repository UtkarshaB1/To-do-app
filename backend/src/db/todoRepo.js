// SELECT all
export async function getAll(pool) {
  const result = await pool.query(
    `select id, title, completed, created_at
       from todos
      order by created_at desc`
  );
  return result.rows;
}

// INSERT one
export async function insert(pool, { id, title, completed }) { 
    const result = await pool.query(
        'INSERT INTO todos (id, title, completed) VALUES ($1, $2, $3) RETURNING *',
        [id, title, completed]
    );
    return result.rows[0];
}

// Flip the boolean and return the updated row
export async function toggle(pool, id) {
  const { rows } = await pool.query(
    `UPDATE todos
        SET completed = NOT completed
      WHERE id = $1
      RETURNING id, title, completed, created_at`,
    [id] 
  );
  return rows[0];
}

export async function remove(pool, id) {
  const { rows } = await pool.query(
    `delete from todos
      where id = $1
      returning id, title, completed, created_at`,
    [id] // parameterized (prevents SQL injection = malicious input becoming code)
  );
  return rows[0]; // undefined if id not found
}