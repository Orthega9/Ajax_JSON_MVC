using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.Web.Mvc;

namespace WebUdemyCourse.Controllers
{
    public class SeccionController : Controller
    {
        // GET: Seccion
        public ActionResult Index()
        {
            return View();
        }

        public JsonResult ListarSeccion()
        {
            PruebaDataContext db = new PruebaDataContext();

            var listadoSeccion = db.Seccion.Where(s => s.BHABILITADO.Equals(1))
                                .Select(s => new
                                {
                                   s.IIDSECCION,
                                   s.NOMBRE
                                }).ToList();

            return Json(listadoSeccion,JsonRequestBehavior.AllowGet);
        }
    }
}