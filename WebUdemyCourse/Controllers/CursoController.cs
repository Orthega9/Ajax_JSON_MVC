using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.Web.Mvc;

namespace WebUdemyCourse.Controllers
{
    public class CursoController : Controller
    {
        // GET: Curso
        public ActionResult Index()
        {
            return View();
        }

        public JsonResult listarCursos()
        {
            PruebaDataContext bd = new PruebaDataContext();
            var lista = bd.Curso.Where(p => p.BHABILITADO.Equals(1))
                .Select(p => new { p.IIDCURSO, p.NOMBRE, p.DESCRIPCION }).ToList();

            return Json(lista, JsonRequestBehavior.AllowGet);
        }

        public JsonResult BuscarCursoNombre(string nombre)
        {
            PruebaDataContext bd = new PruebaDataContext();
            var busquedaCurso = bd.Curso.Where(c => c.BHABILITADO.Equals(1) && c.NOMBRE.Contains(nombre)).
                Select(c => new { c.IIDCURSO, c.NOMBRE, c.DESCRIPCION }).ToList();

            return Json(busquedaCurso, JsonRequestBehavior.AllowGet);
        }

        public JsonResult RecuperarDatos(int id)
        {
            PruebaDataContext db = new PruebaDataContext();
            var lista = db.Curso.Where(p => p.BHABILITADO.Equals(1) && p.IIDCURSO.Equals(id))
                .Select(p => new { p.IIDCURSO, p.NOMBRE, p.DESCRIPCION }).ToList();

            return Json(lista,JsonRequestBehavior.AllowGet);
        }

        public int AgregarCurso(Curso curso)
        {
            PruebaDataContext db = new PruebaDataContext();
            int nRegistrosAfectados = 0;

            try
            {
                if (curso.IIDCURSO == 0)//Nuevo
                {
                    db.Curso.InsertOnSubmit(curso);
                    db.SubmitChanges();
                    nRegistrosAfectados = 1;
                }
                else //Editar
                {
                    Curso entidadCurso =db.Curso.Where(c => c.IIDCURSO.Equals(curso.IIDCURSO)).First();
                    entidadCurso.NOMBRE = curso.NOMBRE;
                    entidadCurso.DESCRIPCION = curso.DESCRIPCION;
                    db.SubmitChanges();
                    nRegistrosAfectados = 1;
                }
            }
            catch 
            {
                nRegistrosAfectados = 0;
            }
            return nRegistrosAfectados;
        }

        public int EliminarCurso(Curso curso)
        {
            PruebaDataContext db = new PruebaDataContext();
            int nRegistrosAfectados = 0;
            try
            {
                Curso Ecurso = db.Curso.Where(c => c.IIDCURSO.Equals(curso.IIDCURSO)).First();
                Ecurso.BHABILITADO = 0;
                db.SubmitChanges();
                nRegistrosAfectados = 1;
            }
            catch (Exception)
            {
                nRegistrosAfectados = 0;
                throw;
            }
            return nRegistrosAfectados;
        }
    }
}