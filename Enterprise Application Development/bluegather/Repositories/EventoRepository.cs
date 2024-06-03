using BlueGather.Context;
using BlueGather.Models;

namespace BlueGather.Repositories
{
    public class EventoRepository : Repository<EventoModel>
    {
        public EventoRepository(BlueGatherContext blueGatherContext) : base(blueGatherContext) { }
    }
}