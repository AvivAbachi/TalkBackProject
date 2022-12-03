using MainApi.Context;
using MainApi.Models;

namespace MainApi.Repositories
{
    public class UserRepository : EntityBaseRepository<Player>, IUserRepository
    {
        public UserRepository(UsersContext context) : base(context) { }

        //public bool isEmailUniq(string email)
        //{
        //    var user = this.GetSingle(u => u.Email == email);
        //    return user == null;
        //}

        public bool IsUsernameUniq(string username)
        {
            var user = GetSingle(u => u.Username == username);
            return user == null;
        }
    }
}
