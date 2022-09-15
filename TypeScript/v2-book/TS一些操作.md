## `as const` 

你也可以使用 `as const` 把整个对象转为一个类型字面量：

```typescript
// Inferred as 2-length tuple
const args = [8, 5] as const;
// OK
const angle = Math.atan2(...args);

const req = { url: "https://example.com", method: "GET" } as const;
handleRequest(req.url, req.method);
```
