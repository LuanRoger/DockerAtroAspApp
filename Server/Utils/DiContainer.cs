﻿using Server.Controllers;
using Server.Controllers.Interfaces;
using Server.Mappers;
using Server.Repositories;
using Server.UseCases.Client;
using Server.UseCases.Intefaces;

namespace Server.Utils;

public static class DiContainer
{
    public static IServiceCollection AddController(this IServiceCollection services)
    {
        services.AddScoped<IClientController, ClientController>();

        return services;
    }
    
    public static IServiceCollection AddUseCases(this IServiceCollection services)
    {
        services.AddScoped<IRequest<IEnumerable<ClientDto>, GetAllClientsQuery>, GetAllClients>();
        services.AddScoped<IRequest<ClientDto, CreateNewClientCommand>, CreateNewClient>();
        services.AddScoped<IRequest<int, DeleteClientCommand>, DeleteClient>();
        
        return services;
    }
    
    public static IServiceCollection AddRepositories(this IServiceCollection services)
    {
        services.AddScoped<IClientRepository, ClientRepository>();
        
        return services;
    }
    
    public static IServiceCollection AddMappers(this IServiceCollection services)
    {
        services.AddScoped<ClientMapper>();
        services.AddScoped<ClientDtoMapper>();
        services.AddScoped<ClientResponseMapper>();
        
        return services;
    }
}