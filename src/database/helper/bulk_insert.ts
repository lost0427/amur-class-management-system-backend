import {PoolClient} from "pg";

// 将 sql 中 insert 后的一个 (?, ?, ?) 重复 times 次。
export function sql_bulk_insert_convert(sql: string, times: number): string {
    // Match the "(?, ?, ?, ...)" part in the SQL query
    const regex = /\((\s*\?\s*,?\s*)+\)/;
    const match = sql.match(regex);
    // Check if exactly one match is found
    if (!match || match.length !== 1) {
        throw new Error("The SQL string must contain exactly one '(?, ?, ?, ...)' placeholder group.");
    }
    // Extract the placeholder group
    const placeholderGroup = match[0];
    // Generate repeated placeholders, separated by commas
    const repeatedPlaceholders = Array(times).fill(placeholderGroup).join(", ");
    // Replace the original placeholder group with the repeated version
    return sql.replace(regex, repeatedPlaceholders);
}

export async function bulk_insert_query(client: PoolClient, sql: string, data: any[][]) {
    // Get the number of columns from the first row of data
    const columnCount = data[0].length;
    // Flatten the data array
    const flattenedData = data.flat();
    // Execute the query with the flattened data array
    return client.query(sql_bulk_insert_convert(sql, columnCount), flattenedData);
}