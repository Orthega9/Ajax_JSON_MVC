using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.Web.Mvc;

namespace WebUdemyCourse.Controllers
{
    public class GradoSeccionController : Controller
    {
        // GET: GradoSeccion
        public ActionResult Index()
        {
            return View();
        }

        public JsonResult ListarGradoSeccion()
        {
            PruebaDataContext db = new PruebaDataContext();
            var lista = (from gradoSeccion in db.GradoSeccion
                         join seccion in db.Seccion
                         on gradoSeccion.IIDSECCION equals seccion.IIDSECCION
                         join grado in db.Grado
                         on gradoSeccion.IIDGRADO equals grado.IIDGRADO
                         where gradoSeccion.BHABILITADO.Equals(1)
                         select new 
                         {
                             gradoSeccion.IID,
                             NOMBREGRADO = grado.NOMBRE,
                             NOMBRESECCION = seccion.NOMBRE
                         }).ToList();

            return Json(lista, JsonRequestBehavior.AllowGet);
        }

        public JsonResult ObtenerGradoSeccion(int id)
        {
            PruebaDataContext db = new PruebaDataContext();
            var consulta = db.GradoSeccion.Where(g => g.IID.Equals(id))
                .Select(
                g => new {
                    g.IID,
                    g.IIDGRADO,
                    g.IIDSECCION
                });

            return Json(consulta, JsonRequestBehavior.AllowGet);
        }

        public JsonResult ListarSeccion()
        {
            PruebaDataContext db = new PruebaDataContext();
            var lista = db.Seccion.Where(s => s.BHABILITADO.Equals(1))
                .Select(
                p => new
                {
                  IDD =  p.IIDSECCION,
                    p.NOMBRE
                });

            return Json(lista, JsonRequestBehavior.AllowGet);
        }

        public JsonResult ListarGrado()
        {
            PruebaDataContext db = new PruebaDataContext();
            var lista = db.Grado.Where(g => g.BHABILITADO.Equals(1))
                .Select(
                g => new {
                   IDD = g.IIDGRADO,
                    g.NOMBRE
                });

            return Json(lista, JsonRequestBehavior.AllowGet);
        }

        public int GuardarDatos(GradoSeccion gs)
        {
            PruebaDataContext db = new PruebaDataContext();
            int registrosAfectados = 0;
            try
            {
                if (gs.IID == 0)
                {
                    db.GradoSeccion.InsertOnSubmit(gs);
                    db.SubmitChanges();
                    registrosAfectados = 1;
                }
                else
                {
                    var grado = db.GradoSeccion.Where(g => g.IID.Equals(gs.IID)).First();
                    grado.IID = gs.IID;
                    grado.IIDGRADO = gs.IIDGRADO;
                    grado.IIDSECCION = gs.IIDSECCION;
                    db.SubmitChanges();
                    registrosAfectados = 1;
                }
            }
            catch 
            {
                registrosAfectados = 0;
            }
            return registrosAfectados;
        }

        #region Elimina datos Grado-Seccion
        public int EliminarGradoSeccion(int id)
        {
            PruebaDataContext db = new PruebaDataContext();
            int registrosAfectdos = 0;
            try
            {
                GradoSeccion gs = db.GradoSeccion.Where(g => g.IID.Equals(id)).FirstOrDefault();
                gs.BHABILITADO = 0;
                db.SubmitChanges();
                registrosAfectdos = 1;
            }
            catch
            {
                registrosAfectdos = 0;
            }
            return registrosAfectdos;
        }
        #endregion
    }
}