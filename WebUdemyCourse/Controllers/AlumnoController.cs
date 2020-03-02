using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.Web.Mvc;

namespace WebUdemyCourse.Controllers
{
    public class AlumnoController : Controller
    {
        // GET: Alumno
        public ActionResult Index()
        {
            return View();
        }

        public JsonResult ListarAlumno()
        {
            PruebaDataContext db = new PruebaDataContext();
            var listaAlumnos = db.Alumno.Where(a => a.BHABILITADO.Equals(1))
                .Select(a => new
                {
                    a.IIDALUMNO,
                    a.NOMBRE,
                    a.APPATERNO,
                    a.APMATERNO,
                    a.TELEFONOPADRE,
                }).ToList();

            return Json(listaAlumnos, JsonRequestBehavior.AllowGet);
        }

        public JsonResult ListarSexo()
        {
            PruebaDataContext db = new PruebaDataContext();
            var listaSexo = db.Sexo.Where(s => s.BHABILITADO.Equals(1))
                .Select(s => new
                {
                    IID = s.IIDSEXO,
                    s.NOMBRE
                }).ToList();

            return Json(listaSexo, JsonRequestBehavior.AllowGet);
        }

        public JsonResult FiltrarSexo(int idSexo)
        {
            PruebaDataContext db = new PruebaDataContext();

            var listadoSexo = db.Alumno.Where(a => a.BHABILITADO.Equals(1) && a.IIDSEXO.Equals(idSexo))
                .Select(a => new {
                    a.IIDALUMNO,
                    a.NOMBRE,
                    a.APPATERNO,
                    a.APMATERNO,
                    a.TELEFONOMADRE
                }).ToList();

            return Json(listadoSexo,JsonRequestBehavior.AllowGet);
        }
        
        public int EliminarAlumno(int id)
        {
            int registrosAfectados = 0;
            try
            {
                PruebaDataContext db = new PruebaDataContext();
                Alumno al = db.Alumno.Where(a => a.IIDALUMNO.Equals(id)).FirstOrDefault();
                al.BHABILITADO = 0;
                db.SubmitChanges();
                registrosAfectados = 1;
            }
            catch (Exception)
            {
                registrosAfectados = 0;
            }
            return registrosAfectados;
        }

        public JsonResult ObtenerEntidadAlumno(int id)
        {
            PruebaDataContext db = new PruebaDataContext();
           var EAlumno = db.Alumno.Where(a => a.IIDALUMNO.Equals(id))
                .Select(a => new {
                    a.IIDALUMNO,
                    a.NOMBRE,
                    a.APPATERNO,
                    a.APMATERNO,
                    FECHANAC = Convert.ToDateTime(a.FECHANACIMIENTO).ToShortDateString(),
                    a.IIDSEXO,
                    a.NUMEROHERMANOS,
                    a.TELEFONOMADRE,
                    a.TELEFONOPADRE
                });

            return Json(EAlumno, JsonRequestBehavior.AllowGet);
        }

        public int GuardarDatos(Alumno alumno)
        {
            int registrosAfectados = 0;
            PruebaDataContext db = new PruebaDataContext();
            try
            {
                if (alumno.IIDALUMNO == 0)
                {
                    //nuevo agregar
                    db.Alumno.InsertOnSubmit(alumno);
                    db.SubmitChanges();
                    registrosAfectados = 1;
                }
                else
                {
                    //Actualizar
                    Alumno ealulmno = db.Alumno.Where(a => a.IIDALUMNO.Equals(alumno.IIDALUMNO)).First();
                    ealulmno.NOMBRE = alumno.NOMBRE;
                    ealulmno.APPATERNO = alumno.APPATERNO;
                    ealulmno.APMATERNO = alumno.APMATERNO;
                    ealulmno.IIDSEXO = alumno.IIDSEXO;
                    ealulmno.TELEFONOPADRE = alumno.TELEFONOPADRE;
                    ealulmno.TELEFONOMADRE = alumno.TELEFONOMADRE;
                    ealulmno.NUMEROHERMANOS = alumno.NUMEROHERMANOS;
                    ealulmno.FECHANACIMIENTO = alumno.FECHANACIMIENTO;

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