using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.Web.Mvc;

namespace WebUdemyCourse.Controllers
{
    public class PeriodoGradoCursoController : Controller
    {
        // GET: PeriodoGradoCurso
        public ActionResult Index()
        {
            return View();
        }

        public JsonResult ListarPeriodoGC()
        {
            PruebaDataContext db = new PruebaDataContext();
            try
            {
                var lista = from pgc in db.PeriodoGradoCurso
                            join periodo in db.Periodo
                            on pgc.IIDPERIODO equals periodo.IIDPERIODO
                            join grado in db.Grado
                            on pgc.IIDGRADO equals grado.IIDGRADO
                            join curso in db.Curso
                            on pgc.IIDCURSO equals curso.IIDCURSO
                            select new
                            {
                                pgc.IID,
                                NOMBREPERIODO = periodo.NOMBRE,
                                NOMBREGRADO = grado.NOMBRE,
                                NOMBRECURSO = curso.NOMBRE
                            };
                return Json(lista, JsonRequestBehavior.AllowGet);
            }
            catch(Exception ex) 
            {

                return Json(ex.Message);
            }
        }

        public JsonResult ObtenerPeiodoGC(int id)
        {
            PruebaDataContext db = new PruebaDataContext();
            try
            {
                var lista = db.PeriodoGradoCurso.Where(p => p.IID.Equals(id))
                    .Select(p => new
                    {
                        p.IID,
                        p.IIDPERIODO,
                        p.IIDGRADO,
                        p.IIDCURSO
                    });

                return Json(lista, JsonRequestBehavior.AllowGet);
            }catch(Exception ex)
            {
                return Json(ex.Message);
            }
        }

        public JsonResult ListarPeriodo()
        {
            PruebaDataContext db = new PruebaDataContext();
            try
            {
                var lista = db.Periodo.Where(p => p.BHABILITADO.Equals(1))
                    .Select(p => new
                    {
                       IDD = p.IIDPERIODO,
                        p.NOMBRE
                    });

                return Json(lista, JsonRequestBehavior.AllowGet);
            }
            catch (Exception ex)
            {
                return Json(ex.Message);
            }
        }

        public JsonResult ListarGrado()
        {
            PruebaDataContext db = new PruebaDataContext();
            try
            {
                var lista = db.Grado.Where(p => p.BHABILITADO.Equals(1))
                    .Select(p => new
                    {
                      IDD =  p.IIDGRADO,
                        p.NOMBRE
                    });

                return Json(lista, JsonRequestBehavior.AllowGet);
            }
            catch (Exception ex)
            {
                return Json(ex.Message);
            }
        }

        public JsonResult ListarCurso()
        {
            PruebaDataContext db = new PruebaDataContext();
            try
            {
                var lista = db.Curso.Where(p => p.BHABILITADO.Equals(1))
                    .Select(p => new
                    {
                        IDD = p.IIDCURSO,
                        p.NOMBRE
                    });

                return Json(lista, JsonRequestBehavior.AllowGet);
            }
            catch (Exception ex)
            {
                return Json(ex.Message);
            }
        }
    }
}