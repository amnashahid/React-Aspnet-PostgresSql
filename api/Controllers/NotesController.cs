using api.Database;
using Microsoft.AspNetCore.Mvc;
using api.Database.Models;

// For more information on enabling Web API for empty projects, visit https://go.microsoft.com/fwlink/?LinkID=397860

namespace api.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class NotesController : ControllerBase
    {
        protected readonly MyDbContext myDbContext;
        public NotesController(MyDbContext myDbContext)
        {
            this.myDbContext = myDbContext; 

        }
        // GET: api/<NotesController>
        [HttpGet]
        public List<Note> Get()
        {
            return myDbContext.Notes.ToList();
        }

        // GET api/<NotesController>/5
        [HttpGet("{id}")]
        public string Get(int id)
        {
            return "value";
        }

        // POST api/<NotesController>
        [HttpPost]
        public void Post(Note value)
        {
            this.myDbContext.Notes.Add(value);
            this.myDbContext.SaveChanges();
        }

        // PUT api/<NotesController>/5
        [HttpPut]
        public void Put(Note value)
        {
            var note= myDbContext.Notes.FirstOrDefault(x=>x.Id==value.Id);

            if (note != null)
            {
                note.Title = value.Title;
                note.Desc = value.Desc;
                this.myDbContext.SaveChanges();
            }
        }

        // DELETE api/<NotesController>/5
        [HttpDelete("{id}")]
        public void Delete(int id)
        {
            var note = myDbContext.Notes.FirstOrDefault(x => x.Id == id);
            if (note != null)
            {
                myDbContext.Notes.Remove(note);
                this.myDbContext.SaveChanges();
            }
        }
    }
}
