﻿using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;

namespace WebUdemyCourse.Models
{
    public class Periodo
    {
        public int IdPeriodo { get; set; }
        public string Nombre { get; set; }
        public DateTime FechaInicio { get; set; }
        public DateTime FechaFin { get; set; }
        public int PHabilitado { get; set; }
    }
}