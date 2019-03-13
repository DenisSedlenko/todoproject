namespace ToDoServer.Common.Models
{
    using System.Collections.Generic;

    public class User
    {
        public int UserId { get; set; }

        public string Email { get; set; }

        public ICollection<Board> Boards { get; set; }
    }
}
