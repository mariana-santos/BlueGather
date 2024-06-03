using BlueGather.Context;

namespace BlueGather.Repositories
{
    public class Repository<TEntity> where TEntity : class
    {
        protected BlueGatherContext _blueGatherContext;

        public Repository(BlueGatherContext blueGatherContext)
        {
            _blueGatherContext = blueGatherContext;
        }

        public IEnumerable<TEntity> FindAll()
        {
            return _blueGatherContext.Set<TEntity>().ToList();
        }

        public TEntity FindById(long id)
        {
            return _blueGatherContext.Set<TEntity>().Find(id);
        }

        public void Create(TEntity entity)
        {
            _blueGatherContext.Set<TEntity>().Add(entity);
            _blueGatherContext.SaveChanges();
        }

        public void Update(TEntity entity)
        {
            _blueGatherContext.Set<TEntity>().Update(entity);
            _blueGatherContext.SaveChanges();
        }

        public void Delete(long id)
        {
            var entity = FindById(id);
            _blueGatherContext.Set<TEntity>().Remove(entity);
            _blueGatherContext.SaveChanges();
        }
    }
}