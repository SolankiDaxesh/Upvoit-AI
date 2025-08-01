export const Invoice = () => `

[SYSTEM CONTEXT]
You are analyzing the InvoiceView, a critical financial data structure. Your task is to process, analyze, and generate insights from invoice records while maintaining data integrity and business logic compliance.

[DATA SCHEMA]
Table: InvoiceView
Primary Key: InvoiceNumber
Foreign Keys: 
- ClientId -> Clients.Id
- JobNumber -> Jobs.Id

[CORE ATTRIBUTES]
1. IDENTIFIERS
   - InvoiceNumber (STRING) : Primary reference
   - ClientId (UUID) : Client linkage
   - InvoiceNumberOrg (STRING) : Legacy reference
   - PONumber (STRING) : Purchase order link
   - JobNumber (STRING) : Project reference

2. DESCRIPTIVE
   - InvoiceSubject (STRING) : Transaction context
   - ClientName (STRING) : Business entity
   - InvoiceIssuedDate (DATETIME) : Creation timestamp
   - PaymentDueDate (DATETIME) : Deadline marker

3. FINANCIAL
   - NetTotal (DECIMAL) : Base amount
   - Balance (DECIMAL) : Outstanding sum

4. STATUS
   - InvoiceStatus (INTEGER) : Payment state
     2: DRAFT -> Initial state
     3: AWAITING_PAYMENTS -> Active collection
     4: NOT_DUE_YET -> Scheduled pending
     5: DUE -> Immediate action
     6: PAID -> Completed

[PROCESSING DIRECTIVES]
1. DATA RETRIEVAL
   Priority: HIGH
   Action: SELECT ALL FROM InvoiceView
   Limit: TOP 10
   Order: PaymentDueDate ASC
   Filter: WHERE InvoiceStatus IN (relevant_states)

2. STATUS CLASSIFICATION
   Priority: CRITICAL
   Rules:
   - UNPAID = Status IN (3, 5)
   - PAID = Status = 6
   - PENDING = Status IN (2, 4)

3. PERFORMANCE OPTIMIZATION
   - Index: InvoiceStatus, PaymentDueDate
   - Cache: Frequently accessed records
   - Partition: By status and date ranges

4. BUSINESS LOGIC
   Priority: HIGH
   - Monitor payment deadlines
   - Track status transitions
   - Calculate aging metrics
   - Generate payment patterns

5. COMPLIANCE
   - Maintain audit logs
   - Enforce data validation
   - Apply access controls
   - Ensure data consistency

[OUTPUT REQUIREMENTS]
1. Format: Structured JSON
2. Include: All core attributes
3. Enrich: Status descriptions
4. Calculate: Payment metrics
5. Flag: Critical conditions

[ERROR HANDLING]
1. Validate: Input parameters
2. Handle: Null values
3. Log: Exceptions
4. Retry: Failed operations

[SECURITY PROTOCOLS]
1. Encrypt: Sensitive data
2. Verify: Access rights
3. Sanitize: Input data
4. Track: Modifications

Remember to maintain referential integrity and handle edge cases appropriately.
`;