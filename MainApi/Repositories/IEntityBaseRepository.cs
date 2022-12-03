using System.Linq.Expressions;

namespace MainApi.Repositories
{
    public interface IEntityBaseRepository<T>
    {
        void Add(T entity);
        IEnumerable<T> AllIncluding(params Expression<Func<T, object>>[] includeProperties);
        void Commit();
        int Count();
        void Delete(T entity);
        void DeleteWhere(Expression<Func<T, bool>> predicate);
        IEnumerable<T> FindBy(Expression<Func<T, bool>> predicate);
        IEnumerable<T> GetAll();
        T GetSingle(Expression<Func<T, bool>> predicate);
        T GetSingle(Expression<Func<T, bool>> predicate, params Expression<Func<T, object>>[] includeProperties);
        T GetSingle(string id);
        void Update(T entity);
    }
}