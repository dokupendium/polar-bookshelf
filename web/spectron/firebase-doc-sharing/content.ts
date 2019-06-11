import {SpectronRenderer} from '../../js/test/SpectronRenderer';
import {FirebaseTestRunner} from '../../js/firebase/FirebaseTestRunner';

mocha.setup('bdd');
mocha.timeout(10000);

SpectronRenderer.run(async (state) => {

    new FirebaseTestRunner(state).run(async () => {

        describe('Firebase doc sharing', function() {

            it("Create a sharing URL and make sure we can download it without credentials", async function() {

                // const firebaseDatastore = new FirebaseDatastore();
                // await firebaseDatastore.init();
                //
                // const path = FilePaths.join(__dirname, '..', '..', '..', 'docs', 'examples', 'pdf', 'chubby.pdf');
                // assert.isTrue(await Files.existsAsync(path));
                //
                // const fileHandle: FileHandle = {path};
                //
                // const backendFileRef: BackendFileRef = {
                //     backend: Backend.STASH,
                //     name: 'test.pdf'
                // };
                //
                // await firebaseDatastore.writeFile(Backend.STASH, {name: 'test.pdf'}, fileHandle);
                //
                // const url = await DocPermissions.create(backendFileRef);
                //
                // console.log(url);

            });

        });

    }).catch(err => console.error(err));

});
