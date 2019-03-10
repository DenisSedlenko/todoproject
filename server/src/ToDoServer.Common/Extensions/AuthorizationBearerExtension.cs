namespace ToDoServer.Common.Extensions
{
    using Microsoft.AspNetCore.Http;

    public static class AuthorizationBearerExtension
    {
        public static string GetAuthorizationBearer(this HttpContext context)
        {
            if (context.Request.Headers.ContainsKey("Authorization"))
            {
                var values = context.Request.Headers["Authorization"][0].Split(' ');

                if (values.Length == 2 && values[0] == "Bearer")
                {
                    return values[1];
                }
            }

            return null;
        }
    }
}
