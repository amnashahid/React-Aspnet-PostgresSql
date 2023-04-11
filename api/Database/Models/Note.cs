using System.ComponentModel.DataAnnotations;

namespace api.Database.Models
{
    public class Note
    {
        [Key]
        public int Id { get; set; }
        public string Title { get; set; }
        public string Desc { get; set; }
        public DateTime CreatedDate{ get; set; }

    }
}
