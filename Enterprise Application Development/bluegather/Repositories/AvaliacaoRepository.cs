using BlueGather.Context;
using BlueGather.Models;

namespace BlueGather.Repositories
{
    public class AvaliacaoRepository : Repository<AvaliacaoModel>
    {
        public AvaliacaoRepository(BlueGatherContext blueGatherContext) : base(blueGatherContext) { }
    }
}