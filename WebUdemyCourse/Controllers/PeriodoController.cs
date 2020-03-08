using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.Web.Mvc;

namespace WebUdemyCourse.Controllers
{
    public class PeriodoController : Controller
    {
        // GET: Periodo
        public ActionResult Index()
        {
            return View();
        }

        public JsonResult listarPeriodo()
        {
            PruebaDataContext bd = new PruebaDataContext();
            try
            {
                var listaPeriodo = bd.Periodo.Where(p => p.BHABILITADO.Equals(1))
                       .Select(p => new
                       {
                           p.IIDPERIODO,
                           p.NOMBRE,
                           FECHAINICIO = Convert.ToDateTime(p.FECHAINICIO).ToShortDateString(),
                           FECHAFIN = Convert.ToDateTime(p.FECHAFIN).ToShortDateString()
                       }).ToList();

                return Json(listaPeriodo, JsonRequestBehavior.AllowGet);
            }
            catch (Exception ex)
            {
                return Json(ex.Message, JsonRequestBehavior.AllowGet);
            }
        }

        public JsonResult BuscarPeriodoNombre(string nombrePeriodo)
        {
            PruebaDataContext bd = new PruebaDataContext();
            var busquedaPeriodo = bd.Periodo.Where(p => p.BHABILITADO.Equals(1) && p.NOMBRE.Contains(nombrePeriodo))
                .Select(p => new {
                    p.IIDPERIODO,
                    p.NOMBRE,
                    FECHAINICIO = Convert.ToDateTime(p.FECHAINICIO).ToShortDateString(),
                    FECHAFIN = Convert.ToDateTime(p.FECHAFIN).ToShortDateString()
                }).ToList();

            return Json(busquedaPeriodo, JsonRequestBehavior.AllowGet);
        }

        public JsonResult ObtenerEntidad(int id)
        {
            PruebaDataContext db = new PruebaDataContext();
            try
            {
                var Eperiodo = db.Periodo.Where(p => p.IIDPERIODO.Equals(id))
                    .Select(p => new
                    {
                        p.IIDPERIODO,
                        p.NOMBRE,
                        FECHAINICIO = Convert.ToDateTime(p.FECHAINICIO).ToShortDateString(),
                        FECHAFIN = Convert.ToDateTime(p.FECHAFIN).ToShortDateString()
                    }).ToList();

                return Json( Eperiodo, JsonRequestBehavior.AllowGet);
            }
            catch (Exception ex)
            {
                return Json(ex.Message, JsonRequestBehavior.AllowGet);
            }
        }

        public int EliminarPeriodo(Periodo p)
        {
            int registrosAfectados = 0;
            PruebaDataContext db = new PruebaDataContext();
            try
            {
                int idPeriodo = p.IIDPERIODO;
                Periodo obj = db.Periodo.Where(x => x.IIDPERIODO.Equals(idPeriodo)).First();
                obj.BHABILITADO = 0;
                db.SubmitChanges();
                registrosAfectados = 1;
            }
            catch 
            {
                registrosAfectados = 0;
            }
            return registrosAfectados;
        }

        public JsonResult recuperarInformacion(int id)
        {
            PruebaDataContext db = new PruebaDataContext();
            var lista = db.Periodo.Where(p => p.IIDPERIODO.Equals(id)).ToList();

            return Json(lista, JsonRequestBehavior.AllowGet);
        }

        public int GuardarDatos(Periodo periodo)
        {
            PruebaDataContext db = new PruebaDataContext();
            int registrosAfectados = 0;

            try
            {
                if (periodo.IIDPERIODO >= 1)
                {
                    //EDITAR
                    var Eperiodo = db.Periodo.Where(p => p.IIDPERIODO.Equals(periodo.IIDPERIODO)).First();
                    Eperiodo.NOMBRE = periodo.NOMBRE;
                    Eperiodo.FECHAINICIO = periodo.FECHAINICIO;
                    Eperiodo.FECHAFIN = periodo.FECHAFIN;
                    db.SubmitChanges();

                    registrosAfectados = 1;
                }
                else
                {
                    //NUEVO
                    db.Periodo.InsertOnSubmit(periodo);
                    db.SubmitChanges();
                    registrosAfectados = 1;
                }
            }
            catch (Exception)
            {
                registrosAfectados = 0;
            }
            return registrosAfectados;
        }
    }
}