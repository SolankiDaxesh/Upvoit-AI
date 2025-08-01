/**
 * Replaces column names in SUM() functions with their corresponding formulas.
 * This function takes a SQL query string and a record of formulas, then replaces
 * any SUM(columnName) patterns with the matching formula if one exists.
 *
 * @param {string} query - The SQL query string containing SUM() functions
 * @param {Record<string, string>} formulas - Object mapping column names to their formula definitions
 * @returns {string} - The query string with SUM() functions replaced by their formulas
 *
 * @example
 * const query = "SELECT SUM(revenue) FROM sales";
 * const formulas = { revenue: "SUM(price) * SUM(quantity)" };
 * const result = replaceColumnNamesWithFormulas(query, formulas);
 */
export function replaceColumnNamesWithFormulas(
  query: string,
  formulas: Record<string, string>
): string {
  // Replace SUM(column) with formula if exists
  let updatedQuery = query.replace(/\bSUM\((\w+)\)/g, (match, group) => {
    return formulas[group] ? `(${formulas[group]})` : match;
  });
  // Replace all occurrences of / COUNT(*) with empty string (removes the division)
  updatedQuery = updatedQuery.replace(/\/\s*COUNT\s*\(\s*\*\s*\)/gi, "");
  return updatedQuery;
}
/**
 * Extracts all column names from a SQL query that are used in SUM() functions.
 * This function specifically looks for patterns like SUM(columnName) in the query.
 *
 * @param {string} query - The SQL query string to analyze
 * @returns {string[]} - Array of unique column names found in SUM() functions
 *
 * @example
 * const query = "SELECT SUM(revenue), SUM(cost) FROM sales";
 * const columns = extractAllColumnNames(query);
 * // Returns: ['revenue', 'cost']
 */
export const extractAllColumnNames = (query: string): string[] => {
  // Match all SUM(columnName) patterns in the query
  const matches = Array.from(query.matchAll(/SUM\((\w+)\)/gi));

  // Extract the column names from the matches
  const columns = matches.map((match) => match[1]);

  // Remove duplicates and return unique column names
  return Array.from(new Set(columns));
};

/**
 * Validates whether all column names used in SUM() functions exist in the provided schema.
 * This is a safety check to ensure the query only references valid columns.
 *
 * @param {string} query - The SQL query string to validate
 * @param {string} schema - The database schema string containing all valid column names
 * @returns {boolean} - True if all column names exist in the schema, false otherwise
 *
 * @example
 * const query = "SELECT SUM(revenue) FROM sales";
 * const schema = "CREATE TABLE sales (revenue DECIMAL, cost DECIMAL)";
 * const isValid = columnNamesExist(query, schema);
 * // Returns: true
 *
 * @throws {Error} - If the query or schema is not a string
 */
export const columnNamesExist = (query: string, schema: string): boolean => {
  // Input validation
  if (typeof query !== "string" || typeof schema !== "string") {
    throw new Error("Query and schema must be strings");
  }

  // Extract column names from the query
  const columnNames = extractAllColumnNames(query);

  // Check if each column name exists in the schema
  return columnNames.every((columnName) => {
    // Use word boundary to ensure exact matches
    const columnExists = new RegExp(`\\b${columnName}\\b`, "g").test(schema);

    if (!columnExists) {
      console.warn(`Column "${columnName}" not found in schema`);
    }

    return columnExists;
  });
};

/**
 * Returns true if the prompt contains words/phrases related to exposing database schema
 * @param {string} prompt - The prompt to analyze
 * @returns {boolean} - True if the prompt contains schema-exposing terms, false otherwise
 */
export function isExposingDatabaseSchemaPrompt(prompt: string): boolean {
  // Regex for common schema-exposing terms (add/remove as needed)
  const schemaRegex =
    /\b(schema|table structure|columns|show tables|describe table|database structure|ddl|erd|entity relationship|list tables|show columns|information_schema|db schema|database tables|table definition|table schema|table columns|show databases|show schema|show schemas|show me the schema|show me tables|show me columns)\b/i;
  return schemaRegex.test(prompt);
}
