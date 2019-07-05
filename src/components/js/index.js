import Vue from 'vue'
import MessageBox from './messageBox'

export var messageBox = (function(){
    var defaults = {
        title : "",
        content : "",
        cancel : "",
        ok : "",
        handlerCancel : null,
        handlerok : null
    };

    var MyComponent = Vue.extend(MessageBox);

    return function (opts){
        for(let attr in opts){
            defaults[attr] = opts[attr]
        }

        var vm = new MyComponent({
            el : document.createElement('div'),

            data : {
                title : defaults.title,
                content : defaults.content,
                cancel : defaults.cancel,
                ok : defaults.ok
            },

            methods : {
                handlerCancel(){
                    defaults.handlerCancel && defaults.handlerCancel.call(this);
                    document.body.removeChild(vm.$el);
                },
                handlerok(){
                    defaults.handlerok && defaults.handlerok.call(this);
                    document.body.removeChild(vm.$el);
                }
            }
        });
        document.body.appendChild(vm.$el)
    }
})()