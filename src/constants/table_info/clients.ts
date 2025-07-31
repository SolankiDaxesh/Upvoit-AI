export const clients = (): string => `

==============================
🧠 BASE RULES FOR SQL GENERATION
==============================

1. Always generate highly optimized SQL queries.
2. Use JOINs with WITH(NOLOCK) on all table references.
3. Use table aliases (e.g., C, CP, CT) to improve readability.
4. Never use SELECT * — only select the necessary columns.
5. Use LEFT JOIN by default unless INNER JOIN is explicitly required.
6. Always apply WHERE C.IsDeleted = 0 to filter active clients.
7. If additional WHERE conditions exist, append AND C.IsDeleted = 0.
8. If the user provides a client name, apply the condition:
   (C.FirstName LIKE '%{name}%' OR C.LastName LIKE '%{name}%')
   and combine it with C.IsDeleted = 0.
9. Use ISNULL() or COALESCE() to handle NULLs safely.
10. Avoid unnecessary subqueries and select only relevant rows.
11. Format SQL cleanly and clearly for readability.

==============================
📦 TABLE STRUCTURE & RELATIONSHIPS
==============================

**Table**: Clients  
**Description**: Stores individual client records.  
**Columns**:  
- ClientId (PK): Unique identifier for the client  
- FirstName: First name of the client  
- LastName: Last name of the client  
- Email: Primary email address  
- Phone: Contact phone number  
- CompanyName : Name of the company 
- PrimaryContactNo : Primary contact number
- PrimaryEmailId: Primary email ID for the client
- Street1: Primary street address
- Street2: Secondary street address (optional)
- City: City of the client
- State: State of the client
- ZipCode: Postal code of the client
- IsDeleted: Flag to indicate soft-deleted clients (1 = deleted, 0 = active)  

---

**Table**: ClientProperties  
**Description**: Stores properties associated with each client.  
**Columns**:  
- Id (PK): Unique property identifier  
- ClientId (FK): Foreign key to Clients  
- Street1	: Primary street address  
- Street2	: Secondary street address (optional)
- City	: City of the client
- State	: State of the client
- Country	: Country of the client
- ZipCode	: Postal code of the client

**Relationship**: ClientProperties.ClientId → Clients.ClientId  

---

**Table**: ClientContacts  
**Description**: Stores additional contacts related to the client.  
**Columns**:  
- ClientContactId (PK): Unique contact ID  
- ClientId (FK): Foreign key to Clients  
- ContactName: Name of the contact  
- ContactPhone: Phone number  
- ContactEmail: Email address  
- Role: Relationship to client (e.g., Manager, Assistant)  

**Relationship**: ClientContacts.ClientId → Clients.ClientId  

==============================
🧪 USAGE GUIDELINES
==============================

- Always start from the Clients table (C).
- Always apply: WHERE C.IsDeleted = 0 to exclude deleted clients.
- When user provides a name like "John":
  WHERE (C.FirstName LIKE '%John%' OR C.LastName LIKE '%John%') AND C.IsDeleted = 0
- Join ClientProperties if property info is needed:
  LEFT JOIN ClientProperties CP WITH(NOLOCK) ON CP.ClientId = C.ClientId
- Join ClientContacts if contact info is needed:
  LEFT JOIN ClientContacts CT WITH(NOLOCK) ON CT.ClientId = C.ClientId

✅ Example:
SELECT 
  C.FirstName,
  C.LastName,
  CP.PropertyName,
  CT.ContactName
FROM Clients C WITH(NOLOCK)
LEFT JOIN ClientProperties CP WITH(NOLOCK) ON CP.ClientId = C.ClientId
LEFT JOIN ClientContacts CT WITH(NOLOCK) ON CT.ClientId = C.ClientId
WHERE (C.FirstName LIKE '%Alice%' OR C.LastName LIKE '%Alice%')
  AND C.IsDeleted = 0
`;
