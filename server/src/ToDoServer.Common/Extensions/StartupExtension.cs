using System.Text;
using Microsoft.EntityFrameworkCore;
using ToDoServer.Common.Models;

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
                    options.TokenValidationParameters = new TokenValidationParameters
                    {
                        ValidateIssuer = true,
                        ValidateAudience = true,
                        ValidateLifetime = true,
                        ValidateIssuerSigningKey = true,

                        ValidIssuer = configuration["Issuer"],
                        ValidAudience = configuration["Audience"],
                        IssuerSigningKey = new SymmetricSecurityKey(Encoding.UTF8.GetBytes(configuration["SecretKey"]))
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

        public static IServiceCollection AddInMemoryDatabase(this IServiceCollection service)
        {
            return service.AddDbContext<TodoContext>(options => options.UseInMemoryDatabase("TodoDb"));
        }
    }
}
