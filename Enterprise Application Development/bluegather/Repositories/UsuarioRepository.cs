using BlueGather.Context;
using BlueGather.Models;

namespace BlueGather.Repositories
{
    public class UsuarioRepository : Repository<UsuarioModel>
    {
        public UsuarioRepository(BlueGatherContext blueGatherContext) : base(blueGatherContext) { }
    }
}