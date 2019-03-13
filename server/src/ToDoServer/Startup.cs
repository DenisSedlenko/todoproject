using Microsoft.AspNetCore.Builder;
using Microsoft.AspNetCore.Hosting;
using Microsoft.AspNetCore.Mvc;
using Microsoft.Extensions.Configuration;
using Microsoft.Extensions.DependencyInjection;
using ToDoServer.Common;
using ToDoServer.Common.Constants;
using ToDoServer.Common.Extensions;
using ToDoServer.Common.Interfaces;
using ToDoServer.Common.Providers;
using ToDoServer.Common.Settings;

namespace ToDoServer
{
    public class Startup
    {
        public Startup(IHostingEnvironment environment)
        {
            var builder = new ConfigurationBuilder()
                                .SetBasePath(environment.ContentRootPath)
                                .AddJsonFile(StartupConstants.AppSettingsJson, optional: true, reloadOnChange: true);
            Configuration = builder.Build();
        }

        public IConfiguration Configuration { get; }

        public void ConfigureServices(IServiceCollection services)
        {
            services.Configure<AppSettings>(Configuration.GetSection(StartupConstants.AppSettingsSectionName));

            services.AddTransient<IUserProvider, UserProvider>();

            services.AddBearerAuthentication(Configuration.GetSection(StartupConstants.AppSettingsSectionName));

            services.AddInMemoryDatabase();

            services.AddMvc().SetCompatibilityVersion(CompatibilityVersion.Version_2_1);

            services.AddCors(options =>
            {
                options.AddPolicy(StartupConstants.CorsPolicyName,
                    builder => builder.AllowAnyOrigin()
                        .AllowAnyMethod()
                        .AllowAnyHeader()
                        .AllowCredentials());
            });
        }

        public void Configure(IApplicationBuilder app, IHostingEnvironment env)
        {
            if (env.IsDevelopment())
            {
                app.UseDeveloperExceptionPage();
            }
            else
            {
                app.UseHsts();
            }

            app.UseAuthentication();
            app.UseCors(StartupConstants.CorsPolicyName);

            app.UseHttpsRedirection();
            app.UseMvc();
        }
    }
}
