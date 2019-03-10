namespace ToDoServer.Common.Extensions
{
    using Microsoft.AspNetCore.Http;
    using Microsoft.Extensions.DependencyInjection;
    using Microsoft.Extensions.Configuration;
    using Microsoft.AspNetCore.Authentication;
    using Microsoft.AspNetCore.Authentication.JwtBearer;
    using Microsoft.IdentityModel.Tokens;

    public static class StartupExtension
    {
        public static AuthenticationBuilder AddBearerAuthentication(
            this IServiceCollection service, IConfiguration configuration)
        {
            return service.AddAuthentication(options =>
            {
                options.DefaultAuthenticateScheme = JwtBearerDefaults.AuthenticationScheme;
                options.DefaultChallengeScheme = JwtBearerDefaults.AuthenticationScheme;
            })
                .AddJwtBearer(options =>
                {
                    options.Authority = configuration["AuthEndpoint"];
                    options.Audience = configuration["AppId"];
                    options.TokenValidationParameters = new TokenValidationParameters
                    {
                        ValidateIssuer = false
                    };
                    options.Events = new JwtBearerEvents
                    {
                        OnAuthenticationFailed = context =>
                        {
                            context.Response.StatusCode = 403;
                            context.Response.ContentType = "text/plain";
                            return context.Response.WriteAsync("An error occurred processing your authentication.");
                        }
                    };
                });
        }
    }
}
