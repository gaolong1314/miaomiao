import Vue from 'vue';
import MessageBox from './MessageBox';

export var messageBox = (function () {
    var defaults = {
        title: '',
        content: '',
        cancel: '',
        ok: '',
        handleCancel: null,
        handleOk: null,
    }
    var myComponents = Vue.extend(MessageBox);

    return function (opts) {
        for (var att in opts) {
            defaults[att] = opts[att];
        }

        var vm = new myComponents({
            el: document.createElement('div'),
            data: {
                title: defaults.title,
                content: defaults.content,
                cancel: defaults.cancel,
                ok: defaults.ok,
            },
            methods: {
                handleCancel: function () {
                    defaults.handleCancel && defaults.handleCancel.call(this);
                    document.body.removeChild(vm.$el);
                },

                handleOk: function () {
                    defaults.handleOk && defaults.handleOk.call(this);
                    document.body.removeChild(vm.$el);
                }
            }

        });
        document.body.appendChild(vm.$el);
    }
})()