using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.Web.Mvc;
using WebUdemyCourse.Models;

namespace WebUdemyCourse.Controllers
{
    public class RepasoController : Controller
    {
        // GET: Repaso
        public ActionResult Index()
        {
            return View();
        }

        public ActionResult TablaJS()
        {
            return View();
        }

        public JsonResult ListarPersona()
        {
            List<Persona> personas = new List<Persona>
            {
                new Persona { idPersona=1, nombre="Hugo", APaterno="Merino", AMaterno="Ortega"},
                new Persona { idPersona=2, nombre="Juan", APaterno="Sanchez", AMaterno="Mendez"},
                new Persona { idPersona=3, nombre="Pedro", APaterno="Rodriguez", AMaterno="Ochoa"},
                new Persona { idPersona=4, nombre="Julio", APaterno="Garcia", AMaterno="Garcia"},
                new Persona { idPersona=5, nombre="Marco", APaterno="Mendoza", AMaterno="Diaz"}
            };

            return Json(personas, JsonRequestBehavior.AllowGet);
        }
    }
}