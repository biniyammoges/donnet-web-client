export const transformObjectToQuery = (obj: Record<string, any>) => {
     let query = '';
     for (const key in obj) {
          if (obj.hasOwnProperty(key)) {
               const value = obj[key];
               query += `${encodeURIComponent(key)}=${encodeURIComponent(value)}&`;
          }
     }
     return query.slice(0, -1); // Remove the trailing '&' character
}