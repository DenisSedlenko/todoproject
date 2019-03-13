namespace ToDoServer.Common.Models
{
    using System.Collections.Generic;

    public class Board
    {
        public int BoardId { get; set; }

        public string Title { get; set; }

        public ICollection<Todo> Todos { get; set; }

        public int UserId { get; set; }

        public User User { get; set; }
    }
}
