using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.Web.Mvc;

namespace WebUdemyCourse.Controllers
{
    public class DocenteController : Controller
    {
        // GET: Docente
        public ActionResult Index()
        {
            return View();
        }

        public JsonResult ListarDocente()
        {
            PruebaDataContext db = new PruebaDataContext();
            var listadoDocente = (from docente in db.Docente where docente.BHABILITADO.Equals(1)
                                  select new
                                  {
                                      docente.IIDDOCENTE,
                                      docente.NOMBRE,
                                      docente.APPATERNO,
                                      docente.APMATERNO,
                                      docente.EMAIL
                                  }).ToList();

            return Json(listadoDocente, JsonRequestBehavior.AllowGet);
        }

        public JsonResult ListarModalidadContrato()
        {
            PruebaDataContext db = new PruebaDataContext();

            var listadoModalidad = db.ModalidadContrato.Where(m => m.BHABILITADO.Equals(1))
                .Select(m => new
                {
                  IDD =  m.IIDMODALIDADCONTRATO,
                  m.NOMBRE
                }).ToList();

            return Json(listadoModalidad, JsonRequestBehavior.AllowGet);
        }

        public JsonResult FiltrarDocenteModalidad(int idModalidad)
        {
            PruebaDataContext db = new PruebaDataContext();
            var filtradoModalidad = db.Docente.Where( d => d.BHABILITADO.Equals(1) && d.IIDMODALIDADCONTRATO.Equals(idModalidad))
                                .Select(d => new  {
                                      d.IIDDOCENTE,
                                      d.NOMBRE,
                                      d.APPATERNO,
                                      d.APMATERNO,
                                      d.EMAIL
                                  }).ToList();

            return Json(filtradoModalidad, JsonRequestBehavior.AllowGet);
        }

        public int EliminarDocente(int id)
        {
            int RegistrosAfectados = 0;
            PruebaDataContext db = new PruebaDataContext();
            try
            {
                Docente docente =db.Docente.Where(d => d.IIDDOCENTE.Equals(id)).First();
                docente.BHABILITADO = 0;
                db.SubmitChanges();
                RegistrosAfectados = 1;
            }
            catch (Exception ex)
            {

                RegistrosAfectados = 0;
            }
            return RegistrosAfectados;
        }

        public JsonResult ObtenerDocente(int id)
        {
            PruebaDataContext db = new PruebaDataContext();

            var Edocente = db.Docente.Where(p => p.IIDDOCENTE.Equals(id))
                .Select(p => new
                {
                    p.IIDDOCENTE,
                    p.NOMBRE,
                    p.APPATERNO,
                    p.APMATERNO,
                    p.DIRECCION,
                    p.TELEFONOCELULAR,
                    p.TELEFONOFIJO,
                    p.IIDSEXO,
                    p.EMAIL,
                    FECHA = Convert.ToDateTime(p.FECHACONTRATO).ToShortDateString(),
                    p.IIDMODALIDADCONTRATO,
                    FOTOMOSTRAR = Convert.ToBase64String(p.FOTO.ToArray())
                    });

            return Json(Edocente, JsonRequestBehavior.AllowGet);


        }

        public int GuardarDocente(Docente docente, string cadenaFoto)
        {
            PruebaDataContext db = new PruebaDataContext();
            int registrosAfectados = 0;
            try
            {
                if (docente.IIDDOCENTE == 0)
                {
                    docente.FOTO = Convert.FromBase64String(cadenaFoto);
                    db.Docente.InsertOnSubmit(docente);
                    db.SubmitChanges();
                    registrosAfectados = 1;
                }
                else
                {
                    Docente obj = db.Docente.Where(d => d.IIDDOCENTE.Equals(docente.IIDDOCENTE)).First();
                    obj.NOMBRE = docente.NOMBRE;
                    obj.APPATERNO = docente.APPATERNO;
                    obj.APMATERNO = docente.APMATERNO;
                    obj.DIRECCION = docente.DIRECCION;
                    obj.TELEFONOCELULAR = docente.TELEFONOCELULAR;
                    obj.TELEFONOFIJO = docente.TELEFONOFIJO;
                    obj.EMAIL = docente.EMAIL;
                    obj.IIDSEXO = docente.IIDSEXO;
                    obj.FECHACONTRATO = docente.FECHACONTRATO;
                    obj.IIDMODALIDADCONTRATO = docente.IIDMODALIDADCONTRATO;
                    obj.FOTO = Convert.FromBase64String(cadenaFoto);
                    db.SubmitChanges();

                    registrosAfectados = 1;


                }
            }
            catch (Exception ex)
            {
                registrosAfectados = 0;
            }
            return registrosAfectados;
        }
    }
}