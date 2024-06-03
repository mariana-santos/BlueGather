using BlueGather.Context;
using BlueGather.Models;

namespace BlueGather.Repositories
{
    public class StatusRepository : Repository<StatusModel>
    {
        public StatusRepository(BlueGatherContext blueGatherContext) : base(blueGatherContext) { }
    }
}