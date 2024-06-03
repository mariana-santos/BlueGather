using BlueGather.Context;
using BlueGather.Models;

namespace BlueGather.Repositories
{
    public class MomentoRepository : Repository<MomentoModel>
    {
        public MomentoRepository(BlueGatherContext blueGatherContext) : base(blueGatherContext) { }
    }
}