/* 
* @Author: caoke
* @Date:   2015-09-18 14:22:50
* @Last Modified by:   caoke
* @Last Modified time: 2015-09-18 16:34:45
*/

var should = require('should');
var i18n = require('../index');

describe('find key', function() {

    it('found', function() {

        i18n({ key: 'hello' })('key').should.eql('hello');
    });

    it('not found', function() {

        i18n()('key').should.eql('key');

        i18n({})('key').should.eql('key');

        i18n({ key1: 'hello' })('key').should.eql('key');
    });

    it('resource merge', function() {

        i18n(
            { key: 'hello' },
            { key: 'bye' }
        )('key').should.eql('bye');

        i18n(
            { key1: 'hello' },
            { key: 'bye' }
        )('key').should.eql('bye');

        i18n(
            { key: 'hello' },
            { key1: 'bye' }
        )('key').should.eql('hello');
    });
});

describe('template', function() {

    it('params', function() {

        i18n({
            key: 'hello {1}'
        })('key').should.eql('hello ');

        i18n({
            key: 'hello {1}'
        })('key', 'world1', 'world2').should.eql('hello world1');

        i18n({
            key: 'hello {1}, {2}'
        })('key', 'world1', 'world2').should.eql('hello world1, world2');

        i18n({
            key: 'hello {1}, {1}'
        })('key', 'world1', 'world2').should.eql('hello world1, world1');

        i18n({
            key: 'hello {2}, {1}'
        })('key', 'world1', 'world2').should.eql('hello world2, world1');
    });

    it('escape', function() {

        i18n({
            key: 'hello {name}'
        })('key').should.eql('hello {name}');

        i18n({
            key: 'hello {1+1}'
        })('key').should.eql('hello {1+1}');
    });
});
