using BlueGather.Context;
using BlueGather.Models;
using BlueGather.Repositories;
using BlueGather.Services;
using Microsoft.EntityFrameworkCore;

var builder = WebApplication.CreateBuilder(args);
var configuration = builder.Configuration;

builder.Services.AddControllers();
builder.Services.AddEndpointsApiExplorer();
builder.Services.AddSwaggerGen();

builder.Services.AddDbContext<BlueGatherContext>(options => options.UseOracle(configuration.GetConnectionString("OracleConnection")));

builder.Services.AddScoped<Repository<AvaliacaoModel>>();
builder.Services.AddScoped<Repository<EventoModel>>();
builder.Services.AddScoped<Repository<ImagemModel>>();
builder.Services.AddScoped<Repository<MomentoModel>>();
builder.Services.AddScoped<Repository<StatusModel>>();
builder.Services.AddScoped<Repository<TipoEventoModel>>();
builder.Services.AddScoped<Repository<UsuarioModel>>();

builder.Services.AddScoped<AvaliacaoService>();
builder.Services.AddScoped<EventoService>();
builder.Services.AddScoped<ImagemService>();
builder.Services.AddScoped<MomentoService>();
builder.Services.AddScoped<StatusService>();
builder.Services.AddScoped<TipoEventoService>();
builder.Services.AddScoped<UsuarioService>();

var app = builder.Build();

app.UseSwagger();
app.UseSwaggerUI();

//app.UseHttpsRedirection();
//app.UseAuthorization();
app.MapControllers();

app.Run();