using Duende.IdentityServer.EntityFramework.Options;
using MainApi.Models;
using Microsoft.AspNetCore.ApiAuthorization.IdentityServer;
using Microsoft.EntityFrameworkCore;
using Microsoft.Extensions.Options;

namespace MainApi.Context
{
    public class PlayersContext : ApiAuthorizationDbContext<Player>
    {
        public PlayersContext(DbContextOptions options, IOptions<OperationalStoreOptions> operationalStoreOptions) : base(options, operationalStoreOptions) { }
    }
}
