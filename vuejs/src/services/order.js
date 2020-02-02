export function order (schema) {
    for (const db in schema) {
        schema[db] = schema[db].sort();
    }
}
