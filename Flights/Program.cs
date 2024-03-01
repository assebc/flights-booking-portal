using FlightsSearchPortal.Data;
using FlightsSearchPortal.Domain.Entities;

var builder = WebApplication.CreateBuilder(args);

// Add services to the container.
builder.Services.AddControllersWithViews();
builder.Services.AddSwaggerGen(c =>
{
    c.CustomOperationIds(e => $"{e.ActionDescriptor.RouteValues["action"] + e.ActionDescriptor.RouteValues["controller"]}");
});

builder.Services.AddSingleton<Entities>();

var app = builder.Build();

var entities = app.Services.CreateScope().ServiceProvider.GetService<Entities>();
var random = new Random();

Flight[] flightsToSeed = new Flight[]
{
    new(1,
        "American Airlines",
        random.Next(90, 500).ToString(),
        new TimePlace("Los Angeles", DateTime.Now.AddHours(random.Next(1, 3))),
        new TimePlace("Istanbul", DateTime.Now.AddHours(random.Next(4, 10))),
        random.Next(1, 853)),

    new(2,
        "Deutsche BA",
        random.Next(90, 500).ToString(),
        new TimePlace("Munchen", DateTime.Now.AddHours(random.Next(1, 3))),
        new TimePlace("Schinpol", DateTime.Now.AddHours(random.Next(4, 10))),
        random.Next(1, 853)),

    new(3,
        "British Airways",
        random.Next(90, 500).ToString(),
        new TimePlace("London, Englang", DateTime.Now.AddHours(random.Next(1, 3))),
        new TimePlace("Vizzola-Ticino", DateTime.Now.AddHours(random.Next(4, 10))),
        random.Next(1, 853))
};
entities.flights.AddRange(flightsToSeed);


app.UseCors(builder => builder
    .WithOrigins("*")
    .AllowAnyMethod()
    .AllowAnyHeader());

app.UseSwagger();
app.UseSwaggerUI(c =>
{
    c.SwaggerEndpoint("/swagger/v1/swagger.json", "Flights");
    c.RoutePrefix = "";
});

// Configure the HTTP request pipeline.
if (!app.Environment.IsDevelopment())
{
    app.UseExceptionHandler("/Home/Error");
    // The default HSTS value is 30 days. You may want to change this for production scenarios, see https://aka.ms/aspnetcore-hsts.
    app.UseHsts();
}

app.UseHttpsRedirection();
app.UseStaticFiles();

app.UseRouting();

app.UseAuthorization();

app.MapControllerRoute(
    name: "default",
    pattern: "{controller=Flight}/{action=Index}/{id?}");

app.Run();