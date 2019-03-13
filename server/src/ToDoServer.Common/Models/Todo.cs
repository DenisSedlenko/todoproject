namespace ToDoServer.Common.Models
{
    public class Todo
    {
        public int TodoId { get; set; }

        public string Title { get; set; }

        public string Description { get; set; }

        public string DateCompleted { get; set; }

        public bool IsCompleted { get; set; }

        public int BoardId { get; set; }

        public Board Board { get; set; }
    }
}
