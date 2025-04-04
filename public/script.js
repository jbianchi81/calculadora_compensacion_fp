const form_groups = {
    "potencia_en_eje": {
        "type": "multiple",
        "label": "Potencia en el eje",
        "name": "potencia_en_eje",
        "fields": [
            {
                "type": "select",
                "name": "unidades_potencia",
                "options": [
                    {
                        "value": "HP",
                        "text": "HP"
                    },
                    {
                        "value": "KW",
                        "text": "HP"
                    }
                ]
            },
            {
                "type": "input",
                "name": "potencia_en_eje",
                "data_type": "decimal"
            }
        ]
    },
    "tension_nominal": {
        "type": "input",
        "name": "tension_nominal",
        "label": "Tensión nominal [V]",
        "data_type": "decimal"
    },
    "corriente_nominal": {
        "type": "input",
        "name": "corriente_nominal",
        "label": "Corriente nominal del motor [A]",
        "data_type": "decimal"
    },
    "factor_potencia_deseado": {
        "type": "input",
        "name": "factor_potencia_deseado",
        "label": "Factor de potencia deseado",
        "data_type": "decimal",
        "placeholder": "_.__"
    },
    "frecuencia": {
        "type": "input",
        "name": "frecuencia",
        "label": "Frecuencia [Hz]",
        "data_type": "number"
    },
    "factor_potencia_actual": {
        "type": "input",
        "name": "factor_potencia_actual",
        "label": "Factor de potencia actual",
        "data_type": "decimal",
        "placeholder": "_.__"
    },
    "modo_de_calculo": {
        "type": "select",
        "name": "modo_de_calculo",
        "label": "Modo de cálculo",
        "options": [
            {
                "value": "capacidad",
                "text": "Calcular en capacidad [µF]"
            },
            {
                "value": "potencia",
                "text": "Calcular en Potencia [KVAr]"

            }
        ],
        "id": "modo_de_calculo",
        "value": "potencia",
        "style": "max-width: 155px;"
    },
    "potencia_kw": {
        "type": "input",
        "name": "potencia",
        "label": "Potencia [KW]",
        "data_type": "decimal"
    },
    "potencia_w": {
        "type": "input",
        "name": "potencia_w",
        "label": "Potencia [W]",
        "data_type": "decimal"
    },
    "corriente_circuito": {
        "type": "input",
        "name": "corriente_circuito",
        "label": "Corriente del circuito [A]",
        "data_type": "decimal"
    }
}

const forms = {
    "motores_trifasicos": {
        "title": "Cálculo de Motores Trifásicos",
        "fields": [
            form_groups["potencia_en_eje"],
            form_groups["tension_nominal"],
            form_groups["corriente_nominal"],
            form_groups["factor_potencia_deseado"],
            form_groups["frecuencia"],
            form_groups["factor_potencia_actual"]
        ],
        "result_label": "Capacitor p/cos&phi; deseado [KVAr]:"
    },
    "motores_monofasicos": {
        "title": "Cálculo de Motores Monofásicos",
        "fields": [
            form_groups["potencia_en_eje"],
            form_groups["tension_nominal"],
            form_groups["corriente_nominal"],
            form_groups["factor_potencia_deseado"],
            form_groups["frecuencia"],
            form_groups["modo_de_calculo"]
        ],
        "result_label": "Potencia recomendada [KVAr]"
    },
    "trifasico_general_fp_actual": {
        "title": "Cálculo Trifásico General",
        "fields": [
            form_groups["potencia_kw"],
            form_groups["tension_nominal"],
            form_groups["factor_potencia_actual"],
            form_groups["factor_potencia_deseado"],
            form_groups["frecuencia"]
        ],
        "result_label": "Capacitor p/cos&phi; deseado [KVAr]:"
    },
    "monofasico_general": {
        "title": "Cálculo Monofásico General",
        "fields": [
            form_groups["potencia_w"],
            form_groups["tension_nominal"],
            form_groups["factor_potencia_actual"],
            form_groups["factor_potencia_deseado"],
            form_groups["frecuencia"],
            form_groups["modo_de_calculo"]
        ],
        "result_label": "Potencia recomendada [KVAr]"
    },
    "trifasico_general_corriente": {
        "title": "Cálculo Trifásico General",
        "fields": [
            form_groups["potencia_kw"],
            form_groups["tension_nominal"],
            form_groups["corriente_circuito"],
            form_groups["factor_potencia_deseado"],
            form_groups["frecuencia"]
        ],
        "result_label": "Capacitor p/cos&phi; deseado [KVAr]:"
    }
};

function showSubMenu(menuId) {
    document.querySelectorAll('.sub-menu').forEach(menu => {
        if (menu.id === menuId) {
            menu.classList.toggle('show');
        } else {
            menu.classList.remove('show');
        }
    });
}

function loadContent(contentId) {
    document.querySelectorAll('.sub-menu').forEach(menu => {
        menu.classList.remove("show")
    })

    if(!forms[contentId]) {
        throw("Invalid contentId, form not found")
    }
    const form = forms[contentId]

    document.getElementById("content").innerHTML = `
        <div class="container">
            <h2>${form.title}</h2>
            <div class="block_container">
                <div class="block">
                    <form id="formulario_calculo_compensacion">
                        <input name="formulario" hidden value="${contentId}">
                        ${form.fields.map(field=>renderFormGroup(field)).join("\n")}
                        <div class="form-group">
                            <label></label>
                            <button type="button" onclick="generaReporte()">Reporte</button>
                        </div>
                        <label for="capacitor">${form.result_label}</label>
                        <input disabled name="capacitor">
                        <div class="form-group">
                            <button type="button" id="simular" onclick="simularCapacitor()" disabled>Simular</button>
                            <button type="button" id="calcular" onclick="calcularCapacitor()" disabled>Calcular</button>
                        </div>
                    </form>
                </div>
                <div class=block>
                    <form id="formulario_reporte"></form>
                </div>
                <div class=block>
                    <form id="formulario_capacitor"></form>
                </div>
            </div>
        </div>
    `
}

function renderFormGroup(form_group) {
    if(form_group.type == "multiple") {
        return `<div class="form-group">
            <label for="${form_group.name}">${form_group.label}</label>
            ${form_group.fields.map(field=>renderField(field)).join("\n")}
        </div>`
    } else {
        return `<div class="form-group">
            <label for="${form_group.name}">${form_group.label}</label>
            ${renderField(form_group)}
        </div>`
    }
}

function renderField(field) {
    if(field.type=="select") {
        var attrs = ""
        if (field.id) {
            attrs = `${attrs} id="${field.id}"`

        }
        if(field.style) {
            attrs = `${attrs} style="${field.style}"`
        }
        return `<select name="${field.name}" ${attrs}>
            ${field.options.map(option=> {
                const selected = (field.value && field.value == option.value) ? " selected" : ""
                return `<option value="${option.value}"${selected}>${option.text}</option>`
            })}
        </select>`
    } else {
        var attrs = (field.data_type=="decimal") ? `min="0" step="0.01"` : `min="0"`
        if(field.placeholder) {
            attrs = `${attrs} placeholder="${field.placeholder}"`
        }
        if(field.value) {
            attrs = `${attrs} value="${field.value}"`
        }
        if(field.id) {
            attrs = `${attrs} id="${field.id}"`
        }
        if(field.disabled) {
            attrs = `${attrs} disabled`
        } else {
            attrs = `${attrs} required`
        }
        return `<input type="number" name="${field.name}" ${attrs}>`
    }
}

function parseFormData(element_id) {
    const form = document.getElementById(element_id);
    const formData = new FormData(form);
    const params = {};

    formData.forEach((value, key) => {
        params[key] = value;
    });

    return params
}

function generaReporte() {
    const params = parseFormData('formulario_calculo_compensacion')
    // alert(JSON.stringify(formObject,null,2));
    const reporte = calculaReporte(params)
    document.getElementById('formulario_reporte').innerHTML =`
        ${Object.entries(reporte).map(([key, value]) => {
            var field = reporte_fields[key]
            return `<div class="form-group report">
            <label for="${key}">${field.label}</label>
            ${renderField({"name":key,"value":value,"data_type": "decimal", "disabled":true})}
        </div>`;
        }).join("\n")}    
    `
    document.getElementById('calcular').disabled = false
}

const reporte_fields = {
    "potencia_en_eje": {
        "label": "Potencia en el eje [KW]"
    },
    "s_sin_compensar": {
        "label": "S sin compensar [kVA]"
    },
    "q_sin_compensar": {
        "label": "Q sin compensar [kVAr]"
    },
    "potencia_circuito": {
        "label": "Potencia del circuito [kW]"
    },
    "potencia_en_eje_w": {
        "label": "Potencia en el eje [W]"
    },
    "fp_actual": {
        "label": "Factor de potencia Actual"
    },
    "corriente_circuito": {
        "label": "Corriente del circuito [A]"
    }
}


function calcularCapacitor() {
    const params = parseFormData('formulario_calculo_compensacion')
    const params_reporte = parseFormData('formulario_reporte')
    const modo_de_calculo = (params.modo_de_calculo) ? params.modo_de_calculo : "capacidad"

    document.querySelector('label[for=capacitor]').innerHTML = (modo_de_calculo == "capacidad") ? "Capacitor recomendado [&mu;F]:" : "Potencia recomendada [KVAr]"
    document.querySelector('input[name=capacitor]').value = calculaCapacitor(params,params_reporte, modo_de_calculo)
    document.getElementById("simular").disabled = false
}

const capacitor_fields = {
    "corriente_capacitor": {
        "label": "Corriente en el Capacitor [A]"
    },
    "q_compensada": {
        "label": "Q compensada [KVAr]"
    },
    "s_compensada": {
        "label": "S compensada [KVAr]"
    },
    "corriente_compensada": {
        "label": "Corriente compensada [A]"
    },
    "fp_compensado": {
        "label": "Factor de potencia compensado"
    },
    "q_capacitiva_capacitor": {
        "label": "Q capacitiva del capacitor [VAr]"
    }
}

function simularCapacitor() {
    const params = parseFormData('formulario_calculo_compensacion')
    const params_reporte = parseFormData('formulario_reporte')
    const valor_capacitor = parseFloat(document.querySelector(`input[name="capacitor"]`).value)
    
    const params_capacitor = simulaCapacitor(params, params_reporte, valor_capacitor)

    document.getElementById('formulario_capacitor').innerHTML =`
        ${Object.entries(params_capacitor).map(([key, value]) => {
            var field = capacitor_fields[key]
            return `<div class="form-group report">
                <label for="${key}">${field.label}</label>
                ${renderField({"name":key,"value":value,"data_type": "decimal", "disabled":true})}
            </div>`;
        }).join("\n")}
        <div class="form-group report">
            <button type="button" action="informe()">Informe</button>
        </div>`    
}

// funciones eléctricas

function calculaReporte(params) {
    // TODO
    if(params.formulario == "motores_trifasicos") {
        return {
            "potencia_en_eje": Math.round(Math.random()*1000000)/10000,
            "s_sin_compensar": Math.round(Math.random()*10000)/100,
            "q_sin_compensar": Math.round(Math.random()*10000)/100,
            "potencia_circuito": Math.round(Math.random()*10000)/100
        }
    } else if(params.formulario == "motores_monofasicos") {
        return {
            "potencia_en_eje_w": Math.round(Math.random()*1000000)/10000,
            "s_sin_compensar": Math.round(Math.random()*10000)/100,
            "q_sin_compensar": Math.round(Math.random()*10000)/100,
            "fp_actual": Math.round(Math.random()*100)/100
        }
    } else if(params.formulario == "trifasico_general_fp_actual") {
        return {
            "s_sin_compensar": Math.round(Math.random()*10000)/100,
            "q_sin_compensar": Math.round(Math.random()*10000)/100,
            "potencia_circuito": Math.round(Math.random()*10000)/100
        }
    } else if(params.formulario == "monofasico_general") {
        return {
            "s_sin_compensar": Math.round(Math.random()*10000)/100,
            "q_sin_compensar": Math.round(Math.random()*10000)/100,
            "corriente_circuito": Math.round(Math.random()*10000)/100
        }
    } else if(params.formulario == "trifasico_general_corriente") {
        return {
            "s_sin_compensar": Math.round(Math.random()*10000)/100,
            "q_sin_compensar": Math.round(Math.random()*10000)/100,
            "fp_actual": Math.round(Math.random()*100)/100
        }
    } else {
        throw new Error("Invalid params.formulario: not found")
    }
}

function calculaCapacitor(params, params_reporte, modo_de_calculo) {
    // TODO
    return Math.round(Math.random()*100000)/100
}

function simulaCapacitor(params, params_reporte, valor_capacitor) {
    // TODO
    if(params.formulario=="motores_trifasicos") {
        return {
            "corriente_capacitor": Math.round(Math.random()*10000)/100,
            "q_compensada": Math.round(Math.random()*10000)/100,
            "s_compensada": Math.round(Math.random()*10000)/100,
            "corriente_compensada": Math.round(Math.random()*10000)/100,
            "fp_compensado": Math.round(Math.random()*100)/100
        }
    } else if(params.formulario=="motores_monofasicos") {
        return {
            "q_capacitiva_capacitor": Math.round(Math.random()*10000)/100, 
            "corriente_capacitor": Math.round(Math.random()*10000)/100,
            "q_compensada": Math.round(Math.random()*10000)/100,
            "s_compensada": Math.round(Math.random()*10000)/100,
            "corriente_compensada": Math.round(Math.random()*10000)/100,
            "fp_compensado": Math.round(Math.random()*100)/100
        }
    } else if(params.formulario=="trifasico_general_fp_actual") {
        return {
            "corriente_capacitor": Math.round(Math.random()*10000)/100,
            "q_compensada": Math.round(Math.random()*10000)/100,
            "s_compensada": Math.round(Math.random()*10000)/100,
            "corriente_compensada": Math.round(Math.random()*10000)/100,
            "fp_compensado": Math.round(Math.random()*100)/100
        }
    } else if(params.formulario=="monofasico_general") {
        return {
            "q_capacitiva_capacitor": Math.round(Math.random()*10000)/100, 
            "corriente_capacitor": Math.round(Math.random()*10000)/100,
            "q_compensada": Math.round(Math.random()*10000)/100,
            "s_compensada": Math.round(Math.random()*10000)/100,
            "corriente_compensada": Math.round(Math.random()*10000)/100,
            "fp_compensado": Math.round(Math.random()*100)/100
        }
    } else if(params.formulario=="trifasico_general_corriente") {
        return {
            "corriente_capacitor": Math.round(Math.random()*10000)/100,
            "q_compensada": Math.round(Math.random()*10000)/100,
            "s_compensada": Math.round(Math.random()*10000)/100,
            "corriente_compensada": Math.round(Math.random()*10000)/100,
            "fp_compensado": Math.round(Math.random()*100)/100
        }
    } else {
        throw new Error("Invalid params.formulario: not found")
    }
}
