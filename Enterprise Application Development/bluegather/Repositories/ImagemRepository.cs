using BlueGather.Context;
using BlueGather.Models;

namespace BlueGather.Repositories
{
    public class ImagemRepository : Repository<ImagemModel>
    {
        public ImagemRepository(BlueGatherContext blueGatherContext) : base(blueGatherContext) { }
    }
}