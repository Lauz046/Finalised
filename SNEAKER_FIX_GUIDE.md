# Sneaker Page Database Connection Fix

## Problem
The sneaker product detail page was experiencing a PostgreSQL prepared statement error:
```
pq: unnamed prepared statement does not exist
```

This error typically occurs when:
1. Database connections are reused but prepared statements are deallocated
2. Connection pooling issues where statements aren't properly managed
3. Network interruptions causing connection drops

## Root Cause
The issue was specific to the sneaker product page due to:
- Complex GraphQL queries with nested objects (sizePrices)
- Connection pooling configuration not optimized for prepared statements
- Lack of retry logic for database connection issues

## Solutions Implemented

### 1. Enhanced Apollo Client Configuration
- Added better error handling for prepared statement errors
- Improved retry logic with exponential backoff
- Added connection headers for better stability
- Disabled cache merging for sneaker queries to prevent conflicts

### 2. Improved Sneaker Page Data Fetching
- Added retry logic with 3 attempts
- Implemented REST API fallback when GraphQL fails
- Added proper error handling and logging
- Force fresh data fetching to avoid cache issues

### 3. Backend Database Connection Improvements
- Enhanced connection pool settings
- Added connection testing on startup
- Improved sneaker resolver with retry logic
- Better error handling for prepared statement issues

### 4. REST API Fallback
- Created `/api/sneaker/[id]` endpoint as backup
- Provides alternative data source when GraphQL fails
- Maintains same data structure as GraphQL

## Files Modified

### Frontend
- `src/pages/sneaker/[id].tsx` - Enhanced with retry logic and REST fallback
- `src/lib/apolloClient.ts` - Improved error handling and connection settings
- `src/pages/api/sneaker/[id].ts` - New REST API endpoint

### Backend
- `plutus-backend/server.go` - Better connection pool configuration
- `plutus-backend/graph/schema.resolvers.go` - Enhanced sneaker resolver with retry logic

## Testing

### Manual Testing
1. Start the backend: `cd plutus-backend && go run server.go`
2. Start the frontend: `npm run dev`
3. Navigate to a sneaker product page
4. Check browser console for any errors

### Automated Testing
Run the test script:
```bash
node scripts/test-sneaker-endpoint.js
```

## Performance Optimizations

### Database Level
- Added indexes for faster sneaker queries
- Optimized connection pool settings
- Implemented prepared statement retry logic

### Application Level
- Added caching with proper invalidation
- Implemented fallback data sources
- Enhanced error recovery mechanisms

## Monitoring and Debugging

### Console Logs
The application now logs:
- Retry attempts and failures
- Data source used (GraphQL vs REST)
- Connection errors and recovery

### Browser Debugging
Global functions available in development:
- `window.resetApolloCache()` - Clear Apollo cache
- `window.resetApolloClient()` - Reset entire Apollo client
- `window.testBackend()` - Test backend connectivity

## Prevention Strategies

### 1. Connection Management
- Use connection pooling with appropriate limits
- Implement connection health checks
- Add automatic reconnection logic

### 2. Error Handling
- Implement comprehensive retry logic
- Add fallback data sources
- Log errors for debugging

### 3. Monitoring
- Monitor database connection health
- Track query performance
- Alert on connection failures

## Additional Recommendations

### 1. Database Optimization
```sql
-- Add these indexes for better performance
CREATE INDEX CONCURRENTLY IF NOT EXISTS idx_sneakers_id_brand ON sneakers(id, brand);
CREATE INDEX CONCURRENTLY IF NOT EXISTS idx_sneakers_brand_product_name ON sneakers(brand, product_name);
```

### 2. Connection Pool Tuning
```go
// Recommended settings for production
db.SetMaxOpenConns(50)
db.SetMaxIdleConns(20)
db.SetConnMaxLifetime(15 * time.Minute)
db.SetConnMaxIdleTime(10 * time.Minute)
```

### 3. GraphQL Query Optimization
- Use field selection to minimize data transfer
- Implement query batching for multiple requests
- Add query complexity analysis

### 4. Caching Strategy
- Implement Redis for session storage
- Add CDN for static assets
- Use browser caching effectively

## Troubleshooting

### If the issue persists:

1. **Check Database Connections**
   ```bash
   # Check active connections
   psql -c "SELECT count(*) FROM pg_stat_activity WHERE datname = 'your_db';"
   ```

2. **Monitor Query Performance**
   ```sql
   -- Check slow queries
   SELECT query, calls, total_time, mean_time 
   FROM pg_stat_statements 
   ORDER BY mean_time DESC LIMIT 10;
   ```

3. **Reset Apollo Client**
   ```javascript
   // In browser console
   window.resetApolloClient();
   window.location.reload();
   ```

4. **Test Backend Directly**
   ```bash
   curl -X POST http://localhost:8090/query \
     -H "Content-Type: application/json" \
     -d '{"query":"{sneaker(id:\"3404\"){id brand productName}}"}'
   ```

## Future Improvements

1. **Implement Circuit Breaker Pattern**
   - Prevent cascading failures
   - Graceful degradation

2. **Add Health Checks**
   - Database connectivity monitoring
   - GraphQL endpoint health checks

3. **Implement Caching Layer**
   - Redis for session data
   - In-memory caching for frequently accessed data

4. **Add Metrics and Monitoring**
   - Query performance tracking
   - Error rate monitoring
   - Response time alerts

## Conclusion

The implemented solution provides:
- ✅ Robust error handling and retry logic
- ✅ Multiple data fetching strategies
- ✅ Better connection management
- ✅ Comprehensive logging and debugging
- ✅ Performance optimizations

This should resolve the prepared statement issues and provide a more reliable sneaker product page experience. 