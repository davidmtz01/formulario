import mongoose from 'mongoose';

const formularioSchema = new mongoose.Schema({
    nombreCompleto: String,
    direccion: String,
    numeroTelefono: String,
    correoElectronico: String,
    edad: Number,
    estadoCivil: String,
    tipoVivienda: String,
    propietarioInquilino: String,
    tamanoVivienda: String,
    patioJardinSeguro: String,
    numeroPersonas: Number,
    edadesPersonas: String,
    otrosAnimales: String,
    alergiasMascotas: String,
    haTenidoMascotas: String,
    detallesMascotasAnteriores: String,
    cuidadoEntrenamiento: String,
    razonesAdopcion: String,
    expectativasMascota: String
}, { versionKey: false });

const FormularioModel = mongoose.model('Formulario', formularioSchema);

export const getFormulario = async (req, res) => {
    try {
        const formularios = await FormularioModel.find();
        return res.status(200).json({ status: true, data: formularios });
    } catch (error) {
        return res.status(500).json({ status: false, errors: [error.message] });
    }
};

export const saveFormulario = async (req, res) => {
    try {
        const { titulo, descripcion } = req.body;
        const validacion = validar(titulo, descripcion, req.file, 'Y');
        if (validacion.length === 0) {
            const nuevoFormulario = new FormularioModel({
                nombreCompleto: req.body.nombreCompleto,
                direccion: req.body.direccion,
                numeroTelefono: req.body.numeroTelefono,
                correoElectronico: req.body.correoElectronico,
                edad: req.body.edad,
                estadoCivil: req.body.estadoCivil,
                tipoVivienda: req.body.tipoVivienda,
                propietarioInquilino: req.body.propietarioInquilino,
                tamanoVivienda: req.body.tamanoVivienda,
                patioJardinSeguro: req.body.patioJardinSeguro,
                numeroPersonas: req.body.numeroPersonas,
                edadesPersonas: req.body.edadesPersonas,
                otrosAnimales: req.body.otrosAnimales,
                alergiasMascotas: req.body.alergiasMascotas,
                haTenidoMascotas: req.body.haTenidoMascotas,
                detallesMascotasAnteriores: req.body.detallesMascotasAnteriores,
                cuidadoEntrenamiento: req.body.cuidadoEntrenamiento,
                razonesAdopcion: req.body.razonesAdopcion,
                expectativasMascota: req.body.expectativasMascota
            });
            await nuevoFormulario.save();
            return res.status(200).json({ status: true, message: 'Formulario guardado exitosamente' });
        } else {
            return res.status(400).json({ status: false, errors: validacion });
        }
    } catch (error) {
        return res.status(500).json({ status: false, errors: [error.message] });
    }
};

export const updateFormulario = async (req, res) => {
    try {
        const { id } = req.params;
        const { nombreCompleto, direccion, numeroTelefono, correoElectronico, edad, estadoCivil, tipoVivienda, propietarioInquilino, tamanoVivienda, patioJardinSeguro, numeroPersonas, edadesPersonas, otrosAnimales, alergiasMascotas, haTenidoMascotas, detallesMascotasAnteriores, cuidadoEntrenamiento, razonesAdopcion, expectativasMascota } = req.body;

        const formulario = await FormularioModel.findByIdAndUpdate(id, {
            nombreCompleto,
            direccion,
            numeroTelefono,
            correoElectronico,
            edad,
            estadoCivil,
            tipoVivienda,
            propietarioInquilino,
            tamanoVivienda,
            patioJardinSeguro,
            numeroPersonas,
            edadesPersonas,
            otrosAnimales,
            alergiasMascotas,
            haTenidoMascotas,
            detallesMascotasAnteriores,
            cuidadoEntrenamiento,
            razonesAdopcion,
            expectativasMascota
        });
        
        if (!formulario) {
            return res.status(404).json({ status: false, errors: "Formulario no encontrado" });
        }

        return res.status(200).json({ status: true, message: 'Datos actualizados exitosamente' });
    } catch (error) {
        return res.status(500).json({ status: false, errors: [error.message] });
    }
};


export const deleteFormulario = async (req, res) => {
    try {
        const { id } = req.params;

        const formulario = await FormularioModel.findByIdAndDelete(id);
        if (!formulario) {
            return res.status(404).json({ status: false, errors: "Formulario no encontrado" });
        }

        return res.status(200).json({ status: true, message: 'Datos eliminados exitosamente' });
    } catch (error) {
        return res.status(500).json({ status: false, errors: [error.message] });
    }
};



const validar = (formData) => {
    const errors = [];
    if (!formData.nombreCompleto) {
        errors.push('El nombre completo es requerido');
    }
    // Validar otros campos según sea necesario
    return errors;
};
